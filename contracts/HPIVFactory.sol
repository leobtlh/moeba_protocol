// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./HPIVVault.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HPIV Factory
 * @dev Usine mise à jour pour déployer les Vaults Multi-Tranches.
 * Restauration complète des helpers pour compatibilité Front-End.
 */
contract HPIVFactory is Ownable {

    address[] public allVaults;
    mapping(address => bool) public isValidVault;

    // --- WHITELIST ASSUREURS & KYB ---
    enum RequestStatus { None, Pending, Approved, Rejected }

    struct SponsorRequest {
        string companyName;  // Nom de l'entité légale
        string kybHash;      // Hash IPFS
        RequestStatus status;
        uint256 requestDate;
    }

    mapping(address => bool) public isWhitelistedSponsor;
    mapping(address => SponsorRequest) public sponsorRequests;
    address[] public pendingRequestAddresses;

    // --- EVENTS ---
    event VaultCreated(
        address indexed vaultAddress,
        address indexed sponsor,
        string riskName,
        uint256 capTotal,
        uint256 startDate,
        uint256 maturityDate
    );

    event SponsorStatusChanged(address indexed sponsor, bool status);

    event RegistrationRequested(
        address indexed sponsor,
        string companyName,
        string kybHash,
        uint256 timestamp
    );

    constructor() Ownable(msg.sender) {
        // Démo : Whitelist de l'adresse de déploiement pour tests
        isWhitelistedSponsor[msg.sender] = true;
    }

    /**
     * @dev Soumettre une demande d'enregistrement (KYB).
     */
    function registerSponsor(string memory _companyName, string memory _kybHash) external {
        require(!isWhitelistedSponsor[msg.sender], "Already whitelisted");
        // Accepte si status est None ou Rejected (permet de resoumettre)
        require(sponsorRequests[msg.sender].status != RequestStatus.Pending, "Request pending");

        sponsorRequests[msg.sender] = SponsorRequest({
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
    function setSponsorStatus(address _sponsor, bool _status) external onlyOwner {
        isWhitelistedSponsor[_sponsor] = _status;
        sponsorRequests[_sponsor].status = _status ? RequestStatus.Approved : RequestStatus.Rejected;
        emit SponsorStatusChanged(_sponsor, _status);
    }

    /**
     * @dev Création d'un Vault HPIV Sécurisé Multi-Tranches.
     */
    function createVault(
        IERC20 _asset,
        address _compliance, // Gardé pour compatibilité signature app.html
        uint256 _capTotal,
        uint256 _maxCoverage,
        uint256 _startDate,
        uint256 _maturityDate,
        string memory _riskName,
        string memory _description
    ) external returns (address) {
        require(isWhitelistedSponsor[msg.sender], "Not authorized");
        require(_maturityDate > _startDate, "Invalid dates");

        // Génération automatique des symboles pour Junior/Senior
        string memory tokenName = _riskName;
        string memory tokenSymbol = "HPIV";

        HPIVVault newVault = new HPIVVault(
            _asset,
            _compliance,
            msg.sender,
            _capTotal,
            _maxCoverage,
            _startDate,
            _maturityDate,
            _riskName,
            _description,
            tokenName,
            tokenSymbol
        );

        address vaultAddr = address(newVault);
        allVaults.push(vaultAddr);
        isValidVault[vaultAddr] = true;

        emit VaultCreated(vaultAddr, msg.sender, _riskName, _capTotal, _startDate, _maturityDate);

        return vaultAddr;
    }

    // --- HELPERS FRONT-END (RESTAURÉS) ---

    function totalVaults() external view returns (uint256) {
        return allVaults.length;
    }

    function getPendingRequests() external view returns (address[] memory) {
        return pendingRequestAddresses;
    }

    function getRequestDetails(address _sponsor) external view returns (SponsorRequest memory) {
        return sponsorRequests[_sponsor];
    }

    function getAllVaults() external view returns (address[] memory) {
        return allVaults;
    }
}
