// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title HPIV Vault (Hybrid Parametric Insurance Vault) - Version Complète
 * @dev Protocole d'Assurance Paramétrique aligné avec le Frontend.
 */
contract HPIVVault is ERC4626, AccessControl {
    using Math for uint256;

    // --- RÔLES ---
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant INSURER_ROLE = keccak256("INSURER_ROLE");

    // --- CONFIGURATION & METADONNÉES ---
    // Ces données correspondent aux champs du Frontend "app.html"
    string public riskName;                    // Ex: "Florida Wind 2026"
    string public description;                 // Description détaillée des triggers
    uint256 public immutable MAX_VAULT_CAPACITY;
    uint256 public immutable MAX_COVERAGE_AMOUNT;
    uint256 public immutable MATURITY_DATE;
    uint256 public constant LOCK_WINDOW = 5 days;

    // --- ÉTAT FINANCIER ---
    bool public isVaultInitialized;            // Le vault est-il ouvert ?
    uint256 public insurerJuniorCapital;       // La part "First Loss" déposée
    uint256 public insurerPremiumPaid;         // La prime déposée (Yield Reserve)

    // --- ÉTAT DU SINISTRE ---
    bool public isCatastropheTriggered;
    uint256 public seniorLossRatio;            // % de perte investisseur (1e18)
    address public complianceModule;

    // --- EVENTS ---
    event VaultInitialized(uint256 juniorCapital, uint256 premiumAmount, uint256 timestamp);
    event CatastropheTriggered(uint256 severity, uint256 claimAmount, uint256 investorLossPercent);

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
        _grantRole(DEFAULT_ADMIN_ROLE, _insurer);
        _grantRole(INSURER_ROLE, _insurer);

        complianceModule = _compliance;

        // Stockage des données du Frontend sur la Blockchain
        riskName = _riskName;
        description = _description;

        MAX_VAULT_CAPACITY = _capTotal;
        MAX_COVERAGE_AMOUNT = _maxCoverage;
        MATURITY_DATE = block.timestamp + (_durationInDays * 1 days);
    }

    // =============================================================
    // 1. ACTIVATION DU VAULT (L'Assureur paie d'abord)
    // =============================================================

    function initializeVault(uint256 _juniorAmount, uint256 _premiumAmount) external onlyRole(INSURER_ROLE) {
        require(!isVaultInitialized, "HPIV: Already initialized");
        require(_juniorAmount > 0, "Junior Amount must be > 0");
        // Note: _premiumAmount peut être 0 dans certains cas, mais rare.
        require(_juniorAmount < MAX_VAULT_CAPACITY, "Junior > Max Cap");

        // 1. Transfert de la Tranche Junior (Capital à Risque)
        IERC20(asset()).transferFrom(msg.sender, address(this), _juniorAmount);
        insurerJuniorCapital = _juniorAmount;

        // 2. Transfert de la Prime (Yield pur)
        if (_premiumAmount > 0) {
            IERC20(asset()).transferFrom(msg.sender, address(this), _premiumAmount);
            insurerPremiumPaid = _premiumAmount;
        }

        // 3. Ouverture des vannes
        isVaultInitialized = true;

        emit VaultInitialized(_juniorAmount, _premiumAmount, block.timestamp);
    }

    // =============================================================
    // 2. DÉPÔT INVESTISSEURS (Bloqué tant que non activé)
    // =============================================================

    function deposit(uint256 assets, address receiver) public override returns (uint256) {
        require(isVaultInitialized, "HPIV: Vault waiting for Insurer funding");
        // require(_isWhitelisted(receiver), "HPIV: KYC required"); // Désactivé pour la démo simple

        require(totalAssets() + assets <= MAX_VAULT_CAPACITY, "HPIV: Vault full");
        require(block.timestamp < MATURITY_DATE, "HPIV: Too late");

        return super.deposit(assets, receiver);
    }

    // =============================================================
    // 3. GESTION DU SINISTRE (LOGIQUE FIRST LOSS)
    // =============================================================

    function triggerCatastrophe(uint256 measuredValue) external onlyRole(ORACLE_ROLE) {
        require(isVaultInitialized, "HPIV: Not initialized");
        require(!isCatastropheTriggered, "HPIV: Already triggered");

        isCatastropheTriggered = true;

        // Dans une version avancée, actualClaimAmount pourrait dépendre de la sévérité (measuredValue)
        // Ici, on déclenche le paiement max prévu (Total ou Partiel selon le contrat)
        uint256 actualClaimAmount = MAX_COVERAGE_AMOUNT;

        // --- CŒUR DU CALCUL : JUNIOR TRANCHE FIRST ---

        uint256 investorLossAmount = 0;

        // Si le sinistre est plus grand que ce que l'assureur a mis en Junior
        if (actualClaimAmount > insurerJuniorCapital) {
            investorLossAmount = actualClaimAmount - insurerJuniorCapital;
        } else {
            // Sinon, l'assureur couvre tout, les investisseurs ne perdent rien
            investorLossAmount = 0;
        }

        // Calcul du Ratio pour les investisseurs (Senior Tranche)
        uint256 currentTotalAssets = totalAssets();

        // On exclut la Prime (Yield Reserve) du calcul des pertes car elle est sanctuarisée pour le rendement
        // Sauf si le contrat est en défaut total absolu, mais ici on suit la logique "Fairplay"
        uint256 riskCapitalAssets = currentTotalAssets > insurerPremiumPaid ? currentTotalAssets - insurerPremiumPaid : 0;

        uint256 seniorEquity = 0;
        if (riskCapitalAssets > insurerJuniorCapital) {
            seniorEquity = riskCapitalAssets - insurerJuniorCapital;
        }

        if (seniorEquity > 0) {
            seniorLossRatio = (investorLossAmount * 1e18) / seniorEquity;
            // Cap à 100% de perte
            if (seniorLossRatio > 1e18) seniorLossRatio = 1e18;
        } else {
            seniorLossRatio = 1e18; // 100% de perte si plus rien
        }

        emit CatastropheTriggered(measuredValue, actualClaimAmount, seniorLossRatio);
    }

    // =============================================================
    // 4. RETRAIT & WATERFALL
    // =============================================================

    function previewRedeem(uint256 shares) public view override returns (uint256) {
        uint256 grossAssets = super.previewRedeem(shares);

        if (!isCatastropheTriggered) {
            return grossAssets;
        }

        // Si sinistre : application du Haircut sur le Principal
        uint256 principalLoss = (grossAssets * seniorLossRatio) / 1e18;

        // Le rendement (part de prime) est théoriquement protégé dans la logique App,
        // mais dans ERC4626 standard, tout est mélangé dans "share price".
        // Pour la démo stricte on applique la perte calculée.

        if (principalLoss > grossAssets) return 0;
        return grossAssets - principalLoss;
    }

    function withdraw(uint256 assets, address receiver, address owner) public override returns (uint256) {
        bool isLockPeriod = block.timestamp >= (MATURITY_DATE - LOCK_WINDOW) && block.timestamp < MATURITY_DATE;
        require(!isLockPeriod, "HPIV: Locked period");
        return super.withdraw(assets, receiver, owner);
    }

    // --- VUES UTILITAIRES ---

    function getDetails() external view returns (string memory, string memory) {
        return (riskName, description);
    }
}
