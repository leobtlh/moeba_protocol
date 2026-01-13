// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title IStrategy
 * @dev Interface standard pour connecter le Vault à des protocoles de rendement.
 */
interface IStrategy {
    function invest(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function withdrawAll() external;
    function totalValue() external view returns (uint256);
    function asset() external view returns (address);
}

/**
 * @title HPIV Vault (Hybrid Parametric Insurance Vault)
 * @dev Version alignée avec app.html : Gestion précise des dates de Start et Maturity.
 */
contract HPIVVault is ERC4626, AccessControl {
    using Math for uint256;

    // --- RÔLES ---
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant INSURER_ROLE = keccak256("INSURER_ROLE");
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");

    // --- CONFIGURATION METIER ---
    string public riskName;
    string public description;
    uint256 public immutable MAX_VAULT_CAPACITY;
    uint256 public immutable MAX_COVERAGE_AMOUNT;

    // UPDATE: Gestion temporelle stricte
    uint256 public immutable START_DATE;    // Fin souscription / Début Risque
    uint256 public immutable MATURITY_DATE; // Fin Risque / Début Retraits

    // --- GESTION DU FLOAT (INVESTISSEMENT) ---
    IStrategy public strategy;
    uint256 public targetFloatPercent = 8000; // 80% Investi
    uint256 public constant MAX_BPS = 10000;

    // --- ÉTAT FINANCIER ---
    bool public isVaultInitialized;
    uint256 public insurerJuniorCapital;
    uint256 public insurerPremiumPaid;

    // --- ÉTAT DU SINISTRE ---
    bool public isCatastropheTriggered;
    uint256 public seniorLossRatio;
    address public complianceModule;

    // --- EVENTS ---
    event VaultInitialized(uint256 juniorCapital, uint256 premiumAmount, uint256 timestamp);
    event CatastropheTriggered(uint256 severity, uint256 claimAmount, uint256 investorLossPercent);
    event StrategyUpdated(address indexed newStrategy);
    event FloatRatioUpdated(uint256 newRatio);
    event FundsInvested(uint256 amount);
    event FundsRestored(uint256 amount);

    constructor(
        IERC20 _asset,
        address _compliance,
        address _insurer,
        uint256 _capTotal,
        uint256 _maxCoverage,
        uint256 _startDate,     // Timestamp absolu
        uint256 _maturityDate,  // Timestamp absolu
        string memory _riskName,
        string memory _description
    ) ERC4626(_asset) ERC20("HPIV Insurance Vault", "HPIV-LP") {
        require(_maturityDate > _startDate, "HPIV: Maturity must be after Start");
        // Optionnel : require(_startDate > block.timestamp, "HPIV: Start date in past");

        _grantRole(DEFAULT_ADMIN_ROLE, _insurer);
        _grantRole(INSURER_ROLE, _insurer);
        _grantRole(DAO_ROLE, _insurer);

        complianceModule = _compliance;
        riskName = _riskName;
        description = _description;
        MAX_VAULT_CAPACITY = _capTotal;
        MAX_COVERAGE_AMOUNT = _maxCoverage;
        START_DATE = _startDate;
        MATURITY_DATE = _maturityDate;
    }

    // =============================================================
    // 1. GOUVERNANCE & STRATÉGIE
    // =============================================================

    function setStrategy(address _strategy) external onlyRole(DAO_ROLE) {
        require(_strategy != address(0), "Invalid strategy address");
        if (address(strategy) != address(0)) {
            strategy.withdrawAll();
        }
        strategy = IStrategy(_strategy);
        IERC20(asset()).approve(_strategy, type(uint256).max);
        emit StrategyUpdated(_strategy);
    }

    function setFloatRatio(uint256 _ratio) external onlyRole(DAO_ROLE) {
        require(_ratio <= MAX_BPS, "Ratio too high");
        targetFloatPercent = _ratio;
        emit FloatRatioUpdated(_ratio);
        _manageFloat();
    }

    function totalAssets() public view override returns (uint256) {
        uint256 cashBalance = IERC20(asset()).balanceOf(address(this));
        uint256 investedBalance = address(strategy) != address(0) ? strategy.totalValue() : 0;
        return cashBalance + investedBalance;
    }

    // =============================================================
    // 2. GESTION LIQUIDITÉ INTERNE
    // =============================================================

    function _manageFloat() internal {
        if (address(strategy) == address(0)) return;

        uint256 total = totalAssets();
        uint256 targetInvested = (total * targetFloatPercent) / MAX_BPS;
        uint256 currentInvested = strategy.totalValue();

        if (currentInvested < targetInvested) {
            uint256 toInvest = targetInvested - currentInvested;
            uint256 cashBalance = IERC20(asset()).balanceOf(address(this));
            uint256 amount = Math.min(toInvest, cashBalance);
            if (amount > 0) {
                strategy.invest(amount);
                emit FundsInvested(amount);
            }
        }
    }

    function _ensureLiquidity(uint256 amountNeeded) internal {
        uint256 cashBalance = IERC20(asset()).balanceOf(address(this));
        if (cashBalance < amountNeeded) {
            require(address(strategy) != address(0), "Insufficient liquidity & No strategy");
            uint256 shortage = amountNeeded - cashBalance;
            strategy.withdraw(shortage);
            emit FundsRestored(shortage);
        }
    }

    // =============================================================
    // 3. OPÉRATIONS UTILISATEUR (Surcharges Sécurisées)
    // =============================================================

    /**
     * @dev Dépôt autorisé UNIQUEMENT pendant la période de souscription (Avant START_DATE).
     */
    function deposit(uint256 assets, address receiver) public override returns (uint256) {
        require(isVaultInitialized, "HPIV: Vault waiting for Insurer funding");
        require(totalAssets() + assets <= MAX_VAULT_CAPACITY, "HPIV: Vault full");

        // SECURITY UPDATE: Empêche les dépôts une fois le risque démarré
        require(block.timestamp < START_DATE, "HPIV: Subscription period ended (Risk Started)");

        uint256 shares = super.deposit(assets, receiver);
        _manageFloat();
        return shares;
    }

    function mint(uint256 shares, address receiver) public override returns (uint256) {
        require(isVaultInitialized, "HPIV: Vault waiting for Insurer funding");
        // Conversion approximative pour vérifier la capacité, moins précis que deposit
        require(block.timestamp < START_DATE, "HPIV: Subscription period ended (Risk Started)");

        uint256 assets = super.mint(shares, receiver);
        require(totalAssets() <= MAX_VAULT_CAPACITY, "HPIV: Vault full");

        _manageFloat();
        return assets;
    }

    /**
     * @dev Retrait (Withdraw/Redeem) autorisé UNIQUEMENT :
     * 1. Avant START_DATE (Annulation souscription)
     * 2. Après MATURITY_DATE (Récupération finale)
     * 3. Si Catastrophe (Récupération partielle via Soft Default)
     */
    function withdraw(uint256 assets, address receiver, address owner) public override returns (uint256) {
        _checkWithdrawalEligibility();
        _ensureLiquidity(assets);
        return super.withdraw(assets, receiver, owner);
    }

    function redeem(uint256 shares, address receiver, address owner) public override returns (uint256) {
        _checkWithdrawalEligibility();
        // Pour redeem, on doit calculer les assets nécessaires
        uint256 assets = previewRedeem(shares);
        _ensureLiquidity(assets);
        return super.redeem(shares, receiver, owner);
    }

    function _checkWithdrawalEligibility() internal view {
        bool isSubscriptionPeriod = block.timestamp < START_DATE;
        bool isMatured = block.timestamp >= MATURITY_DATE;
        bool isDistressed = isCatastropheTriggered;

        // Si on est DANS la période de risque (Entre Start et Maturity) ET pas de crash, c'est bloqué.
        require(isSubscriptionPeriod || isMatured || isDistressed, "HPIV: Funds locked during risk period");
    }

    // =============================================================
    // 4. INITIALISATION
    // =============================================================

    function initializeVault(uint256 _juniorAmount, uint256 _premiumAmount) external onlyRole(INSURER_ROLE) {
        require(!isVaultInitialized, "HPIV: Already initialized");
        require(_juniorAmount > 0, "Junior Amount must be > 0");
        require(_juniorAmount < MAX_VAULT_CAPACITY, "Junior > Max Cap");

        IERC20(asset()).transferFrom(msg.sender, address(this), _juniorAmount);
        insurerJuniorCapital = _juniorAmount;

        if (_premiumAmount > 0) {
            IERC20(asset()).transferFrom(msg.sender, address(this), _premiumAmount);
            insurerPremiumPaid = _premiumAmount;
        }

        isVaultInitialized = true;
        _manageFloat();
        emit VaultInitialized(_juniorAmount, _premiumAmount, block.timestamp);
    }

    // =============================================================
    // 5. CATASTROPHE & EMERGENCY UNWIND
    // =============================================================

    function triggerCatastrophe(uint256 measuredValue) external onlyRole(ORACLE_ROLE) {
        require(isVaultInitialized, "HPIV: Not initialized");
        require(!isCatastropheTriggered, "HPIV: Already triggered");
        // On autorise le trigger même après maturité si le sinistre a eu lieu juste avant (décalage oracle)

        isCatastropheTriggered = true;

        if (address(strategy) != address(0)) {
            try strategy.withdrawAll() {
                // Succès
            } catch {
                // Echec silencieux pour ne pas bloquer l'état de catastrophe
            }
        }

        uint256 actualClaimAmount = MAX_COVERAGE_AMOUNT;

        uint256 investorLossAmount = 0;
        if (actualClaimAmount > insurerJuniorCapital) {
            investorLossAmount = actualClaimAmount - insurerJuniorCapital;
        }

        uint256 currentTotalAssets = totalAssets();
        uint256 riskCapitalAssets = currentTotalAssets > insurerPremiumPaid ? currentTotalAssets - insurerPremiumPaid : 0;
        uint256 seniorEquity = riskCapitalAssets > insurerJuniorCapital ? riskCapitalAssets - insurerJuniorCapital : 0;

        if (seniorEquity > 0) {
            seniorLossRatio = (investorLossAmount * 1e18) / seniorEquity;
            if (seniorLossRatio > 1e18) seniorLossRatio = 1e18;
        } else {
            seniorLossRatio = 1e18;
        }

        emit CatastropheTriggered(measuredValue, actualClaimAmount, seniorLossRatio);
    }

    // =============================================================
    // 6. RETRAIT FINAL (Redeem)
    // =============================================================

    function previewRedeem(uint256 shares) public view override returns (uint256) {
        uint256 grossAssets = super.previewRedeem(shares);

        if (!isCatastropheTriggered) {
            return grossAssets;
        }

        // Application du haircut (perte) en cas de sinistre
        uint256 principalLoss = (grossAssets * seniorLossRatio) / 1e18;

        if (principalLoss > grossAssets) return 0;
        return grossAssets - principalLoss;
    }

    function getDetails() external view returns (string memory, string memory, uint256, uint256) {
        return (riskName, description, START_DATE, MATURITY_DATE);
    }
}
