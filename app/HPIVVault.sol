// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title IStrategy
 * @dev Interface standard pour connecter le Vault à des protocoles de rendement (Aave, Compound, Ondo...)
 */
interface IStrategy {
    function invest(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function withdrawAll() external;
    function totalValue() external view returns (uint256);
    function asset() external view returns (address);
}

/**
 * @title HPIV Vault (Hybrid Parametric Insurance Vault) - Version Active Float
 * @dev Intègre la gestion de trésorerie (80% investis / 20% cash) et la gouvernance DAO.
 */
contract HPIVVault is ERC4626, AccessControl {
    using Math for uint256;

    // --- RÔLES ---
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant INSURER_ROLE = keccak256("INSURER_ROLE");
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE"); // Nouveau rôle pour la Gouvernance

    // --- CONFIGURATION METIER ---
    string public riskName;
    string public description;
    uint256 public immutable MAX_VAULT_CAPACITY;
    uint256 public immutable MAX_COVERAGE_AMOUNT;
    uint256 public immutable MATURITY_DATE;
    uint256 public constant LOCK_WINDOW = 5 days;

    // --- GESTION DU FLOAT (INVESTISSEMENT) ---
    IStrategy public strategy;                 // Le contrat de stratégie (ex: Aave Adapter)
    uint256 public targetFloatPercent = 8000;  // 80.00% des fonds doivent être investis (Base 10000)
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
        uint256 _durationInDays,
        string memory _riskName,
        string memory _description
    ) ERC4626(_asset) ERC20("HPIV Insurance Vault", "HPIV-LP") {
        // L'assureur est Admin par défaut, mais idéalement ce rôle devrait être transféré à un Multisig/DAO ensuite
        _grantRole(DEFAULT_ADMIN_ROLE, _insurer);
        _grantRole(INSURER_ROLE, _insurer);
        _grantRole(DAO_ROLE, _insurer); // Pour le setup initial

        complianceModule = _compliance;
        riskName = _riskName;
        description = _description;
        MAX_VAULT_CAPACITY = _capTotal;
        MAX_COVERAGE_AMOUNT = _maxCoverage;
        MATURITY_DATE = block.timestamp + (_durationInDays * 1 days);
    }

    // =============================================================
    // 1. GOUVERNANCE & STRATÉGIE
    // =============================================================

    /**
     * @dev Définit le contrat de stratégie (ex: Adapter Aave).
     * Doit être approuvé par la DAO.
     */
    function setStrategy(address _strategy) external onlyRole(DAO_ROLE) {
        require(_strategy != address(0), "Invalid strategy address");
        // Si une ancienne stratégie existe, on rappelle tout les fonds par sécurité
        if (address(strategy) != address(0)) {
            strategy.withdrawAll();
        }
        strategy = IStrategy(_strategy);

        // Approuver le transfert de tokens vers la nouvelle stratégie
        IERC20(asset()).approve(_strategy, type(uint256).max);

        emit StrategyUpdated(_strategy);
    }

    /**
     * @dev Ajuste le % de fonds investis (ex: passer de 80% à 50% en cas de volatilité).
     */
    function setFloatRatio(uint256 _ratio) external onlyRole(DAO_ROLE) {
        require(_ratio <= MAX_BPS, "Ratio too high");
        targetFloatPercent = _ratio;
        emit FloatRatioUpdated(_ratio);
        // On rééquilibre immédiatement
        _manageFloat();
    }

    /**
     * @dev SURCHARGE CRITIQUE : La valeur totale inclut le cash + l'argent investi.
     * Sans ça, déposer de l'argent dans la stratégie ferait chuter le prix de la part.
     */
    function totalAssets() public view override returns (uint256) {
        uint256 cashBalance = IERC20(asset()).balanceOf(address(this));
        uint256 investedBalance = address(strategy) != address(0) ? strategy.totalValue() : 0;
        return cashBalance + investedBalance;
    }

    // =============================================================
    // 2. GESTION LIQUIDITÉ INTERNE
    // =============================================================

    /**
     * @dev Envoie le surplus de cash vers la stratégie selon le targetFloatPercent.
     */
    function _manageFloat() internal {
        if (address(strategy) == address(0)) return;

        uint256 total = totalAssets();
        uint256 targetInvested = (total * targetFloatPercent) / MAX_BPS;
        uint256 currentInvested = strategy.totalValue();

        if (currentInvested < targetInvested) {
            uint256 toInvest = targetInvested - currentInvested;
            uint256 cashBalance = IERC20(asset()).balanceOf(address(this));

            // On ne peut investir que ce qu'on a en cash
            uint256 amount = Math.min(toInvest, cashBalance);
            if (amount > 0) {
                strategy.invest(amount);
                emit FundsInvested(amount);
            }
        }
    }

    /**
     * @dev Rappelle des fonds de la stratégie si le cash est insuffisant pour un retrait.
     */
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
    // 3. OPÉRATIONS UTILISATEUR (Surcharges)
    // =============================================================

    function deposit(uint256 assets, address receiver) public override returns (uint256) {
        require(isVaultInitialized, "HPIV: Vault waiting for Insurer funding");
        require(totalAssets() + assets <= MAX_VAULT_CAPACITY, "HPIV: Vault full");
        require(block.timestamp < MATURITY_DATE, "HPIV: Too late");

        uint256 shares = super.deposit(assets, receiver);

        // Après dépôt, on investit le surplus
        _manageFloat();

        return shares;
    }

    function withdraw(uint256 assets, address receiver, address owner) public override returns (uint256) {
        bool isLockPeriod = block.timestamp >= (MATURITY_DATE - LOCK_WINDOW) && block.timestamp < MATURITY_DATE;
        require(!isLockPeriod, "HPIV: Locked period");

        // Avant retrait, on s'assure d'avoir le cash
        _ensureLiquidity(assets);

        return super.withdraw(assets, receiver, owner);
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

        // On essaie d'investir dès l'initialisation si une stratégie est présente
        _manageFloat();

        emit VaultInitialized(_juniorAmount, _premiumAmount, block.timestamp);
    }

    // =============================================================
    // 5. CATASTROPHE & EMERGENCY UNWIND
    // =============================================================

    function triggerCatastrophe(uint256 measuredValue) external onlyRole(ORACLE_ROLE) {
        require(isVaultInitialized, "HPIV: Not initialized");
        require(!isCatastropheTriggered, "HPIV: Already triggered");

        isCatastropheTriggered = true;

        // EMERGENCY UNWIND: Rappel de TOUS les fonds de la stratégie pour payer les sinistres
        if (address(strategy) != address(0)) {
            try strategy.withdrawAll() {
                // Succès du rapatriement
            } catch {
                // Si échec (ex: protocole DeFi pausé), on continue avec ce qu'on a
                // Dans un vrai protocole, cela déclencherait un état de "Distressed Vault"
            }
        }

        uint256 actualClaimAmount = MAX_COVERAGE_AMOUNT;

        // --- LOGIQUE JUNIOR/SENIOR ---
        uint256 investorLossAmount = 0;
        if (actualClaimAmount > insurerJuniorCapital) {
            investorLossAmount = actualClaimAmount - insurerJuniorCapital;
        }

        uint256 currentTotalAssets = totalAssets(); // Note: utilise maintenant le total combiné

        // Calcul des pertes...
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

        uint256 principalLoss = (grossAssets * seniorLossRatio) / 1e18;

        if (principalLoss > grossAssets) return 0;
        return grossAssets - principalLoss;
    }

    // Ajout nécéssaire pour le factory qui lit les infos
    function getDetails() external view returns (string memory, string memory) {
        return (riskName, description);
    }
}
