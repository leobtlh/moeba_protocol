// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./HPIVVault.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HPIV Factory
 * @dev Usine à Smart Contracts. Gère le déploiement des Vaults et l'onboarding (Whitelist) des assureurs.
 * Mise à jour : Support des dates précises (Start/Maturity) pour correspondre à l'App.
 */
contract HPIVFactory is Ownable {

    address[] public allVaults;
    mapping(address => bool) public isValidVault;

    // --- WHITELIST ASSUREURS & KYB ---

    enum RequestStatus { None, Pending, Approved, Rejected }

    struct InsurerRequest {
        string companyName;  // Nom de l'entité légale
        string kybHash;      // Hash IPFS ou lien vers le dossier de conformité
        RequestStatus status;
        uint256 requestDate;
    }

    mapping(address => bool) public isWhitelistedInsurer;
    mapping(address => InsurerRequest) public insurerRequests;
    address[] public pendingRequestAddresses;

    // --- EVENTS ---
    event VaultCreated(
        address indexed vaultAddress,
        address indexed insurer,
        string riskName,
        uint256 capTotal,
        uint256 startDate,
        uint256 maturityDate
    );

    event InsurerStatusChanged(address indexed insurer, bool status);

    event RegistrationRequested(
        address indexed insurer,
        string companyName,
        string kybHash,
        uint256 timestamp
    );

    constructor() Ownable(msg.sender) {
        // Démo : Whitelist par défaut pour faciliter les tests
        isWhitelistedInsurer[0x912F9886Fb676750943fDeFC4c30d3cA927C3a72] = true;
        insurerRequests[0x912F9886Fb676750943fDeFC4c30d3cA927C3a72] = InsurerRequest({
            companyName: "Moeha Demo Insurer",
            kybHash: "ipfs://QmDemoHash...",
            status: RequestStatus.Approved,
            requestDate: block.timestamp
        });
    }

    /**
     * @dev Soumettre une demande d'enregistrement (KYB).
     */
    function registerInsurer(string memory _companyName, string memory _kybHash) external {
        require(!isWhitelistedInsurer[msg.sender], "HPIV: Already whitelisted");
        require(insurerRequests[msg.sender].status == RequestStatus.None || insurerRequests[msg.sender].status == RequestStatus.Rejected, "HPIV: Request pending or already processed");

        insurerRequests[msg.sender] = InsurerRequest({
            companyName: _companyName,
            kybHash: _kybHash,
            status: RequestStatus.Pending,
            requestDate: block.timestamp
        });

        pendingRequestAddresses.push(msg.sender);
        emit RegistrationRequested(msg.sender, _companyName, _kybHash, block.timestamp);
    }

    /**
     * @dev Admin : Valider ou rejeter un assureur.
     */
    function setInsurerStatus(address _insurer, bool _status) external onlyOwner {
        isWhitelistedInsurer[_insurer] = _status;

        if (insurerRequests[_insurer].status != RequestStatus.None) {
            insurerRequests[_insurer].status = _status ? RequestStatus.Approved : RequestStatus.Rejected;
        } else {
            insurerRequests[_insurer].status = _status ? RequestStatus.Approved : RequestStatus.Rejected;
            insurerRequests[_insurer].companyName = "Manually Added";
        }

        emit InsurerStatusChanged(_insurer, _status);
    }

    /**
     * @dev Création d'un Vault avec Dates Explicites (Start & End).
     * @param _startDate Timestamp du début de la couverture (Fin de souscription / Début Lock).
     * @param _maturityDate Timestamp de fin de couverture (Déblocage des fonds).
     */
    function createVault(
        IERC20 _asset,
        address _compliance,
        uint256 _capTotal,
        uint256 _maxCoverage,
        uint256 _startDate,     // UPDATE: Remplacement de durationInDays
        uint256 _maturityDate,  // UPDATE: Remplacement de durationInDays
        string memory _riskName,
        string memory _description
    ) external returns (address) {
        require(isWhitelistedInsurer[msg.sender], "HPIV: Caller is not a whitelisted Insurer");
        require(_maturityDate > _startDate, "HPIV: Maturity must be after Start");

        HPIVVault newVault = new HPIVVault(
            _asset,
            _compliance,
            msg.sender,
            _capTotal,
            _maxCoverage,
            _startDate,
            _maturityDate,
            _riskName,
            _description
        );

        address vaultAddr = address(newVault);
        allVaults.push(vaultAddr);
        isValidVault[vaultAddr] = true;

        emit VaultCreated(vaultAddr, msg.sender, _riskName, _capTotal, _startDate, _maturityDate);

        return vaultAddr;
    }

    function totalVaults() external view returns (uint256) {
        return allVaults.length;
    }

    // --- HELPERS FRONT-END ---

    function getPendingRequests() external view returns (address[] memory) {
        return pendingRequestAddresses;
    }

    function getRequestDetails(address _insurer) external view returns (InsurerRequest memory) {
        return insurerRequests[_insurer];
    }
}
