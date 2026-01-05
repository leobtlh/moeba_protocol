// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./HPIVVault.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HPIV Factory
 * @dev Usine à Smart Contracts. Gère le déploiement des Vaults et désormais
 * le processus d'onboarding (Whitelist) des assureurs avec vérification KYB.
 */
contract HPIVFactory is Ownable {

    address[] public allVaults;
    mapping(address => bool) public isValidVault;

    // --- WHITELIST ASSUREURS & KYB ---

    // Statut d'une demande
    enum RequestStatus { None, Pending, Approved, Rejected }

    // Structure des données de la demande d'un assureur
    struct InsurerRequest {
        string companyName;  // Nom de l'entité légale
        string kybHash;      // Hash IPFS ou lien vers le dossier de conformité (Certificat, Kbis...)
        RequestStatus status;
        uint256 requestDate;
    }

    // Mapping principal des statuts (True = Whitelisted/Approved)
    mapping(address => bool) public isWhitelistedInsurer;

    // Mapping des détails de la demande
    mapping(address => InsurerRequest) public insurerRequests;

    // Liste des adresses ayant fait une demande (pour itération dans le Backoffice)
    address[] public pendingRequestAddresses;

    // --- EVENTS ---
    event VaultCreated(
        address indexed vaultAddress,
        address indexed insurer,
        string riskName,
        uint256 capTotal
    );

    event InsurerStatusChanged(address indexed insurer, bool status);

    event RegistrationRequested(
        address indexed insurer,
        string companyName,
        string kybHash,
        uint256 timestamp
    );

    constructor() Ownable(msg.sender) {
        // Ajout de l'adresse de démo comme whitelisted par défaut
        isWhitelistedInsurer[0x912F9886Fb676750943fDeFC4c30d3cA927C3a72] = true;

        // On initialise aussi la struct pour la démo pour que ce soit propre
        insurerRequests[0x912F9886Fb676750943fDeFC4c30d3cA927C3a72] = InsurerRequest({
            companyName: "Moeha Demo Insurer",
            kybHash: "ipfs://QmDemoHash...",
            status: RequestStatus.Approved,
            requestDate: block.timestamp
        });
    }

    /**
     * @dev Permet à un assureur de soumettre une demande d'enregistrement.
     * @param _companyName Le nom de la compagnie d'assurance.
     * @param _kybHash Le lien/hash vers les documents de preuve (KYB).
     */
    function registerInsurer(string memory _companyName, string memory _kybHash) external {
        require(!isWhitelistedInsurer[msg.sender], "HPIV: Already whitelisted");
        require(insurerRequests[msg.sender].status == RequestStatus.None || insurerRequests[msg.sender].status == RequestStatus.Rejected, "HPIV: Request pending or already processed");

        // Enregistrement de la demande
        insurerRequests[msg.sender] = InsurerRequest({
            companyName: _companyName,
            kybHash: _kybHash,
            status: RequestStatus.Pending,
            requestDate: block.timestamp
        });

        // Ajout à la liste pour le backoffice
        // Note: Dans une version optimisée gas, on pourrait gérer des index pour éviter les doublons si rejeté puis ré-soumis,
        // mais ici on ajoute simplement pour l'historique. Le backoffice filtrera.
        pendingRequestAddresses.push(msg.sender);

        emit RegistrationRequested(msg.sender, _companyName, _kybHash, block.timestamp);
    }

    /**
     * @dev Fonction Admin pour valider ou rejeter une demande.
     * Met à jour le mapping boolean (pour les accès) et le statut de la struct (pour l'affichage).
     */
    function setInsurerStatus(address _insurer, bool _status) external onlyOwner {
        // 1. Mise à jour de l'accès fonctionnel (Whitelist)
        isWhitelistedInsurer[_insurer] = _status;

        // 2. Mise à jour du statut administratif
        if (insurerRequests[_insurer].status != RequestStatus.None) {
            insurerRequests[_insurer].status = _status ? RequestStatus.Approved : RequestStatus.Rejected;
        } else {
            // Cas où l'admin whitelist manuellement sans demande préalable
            insurerRequests[_insurer].status = _status ? RequestStatus.Approved : RequestStatus.Rejected;
            insurerRequests[_insurer].companyName = "Manually Added";
        }

        emit InsurerStatusChanged(_insurer, _status);
    }

    function createVault(
        IERC20 _asset,
        address _compliance,
        uint256 _capTotal,
        uint256 _maxCoverage,
        uint256 _durationInDays,
        string memory _riskName,
        string memory _description
    ) external returns (address) {
        require(isWhitelistedInsurer[msg.sender], "HPIV: Caller is not a whitelisted Insurer");

        HPIVVault newVault = new HPIVVault(
            _asset,
            _compliance,
            msg.sender, // L'assureur reçoit le rôle Admin & DAO initialement
            _capTotal,
            _maxCoverage,
            _durationInDays,
            _riskName,
            _description
        );

        address vaultAddr = address(newVault);
        allVaults.push(vaultAddr);
        isValidVault[vaultAddr] = true;

        emit VaultCreated(vaultAddr, msg.sender, _riskName, _capTotal);

        return vaultAddr;
    }

    function totalVaults() external view returns (uint256) {
        return allVaults.length;
    }

    // --- HELPERS POUR LE FRONT-END ---

    /**
     * @dev Retourne la liste complète des adresses ayant fait une demande.
     * Le backoffice itérera sur cette liste pour afficher le tableau.
     */
    function getPendingRequests() external view returns (address[] memory) {
        return pendingRequestAddresses;
    }

    /**
     * @dev Retourne les détails d'une demande spécifique.
     */
    function getRequestDetails(address _insurer) external view returns (InsurerRequest memory) {
        return insurerRequests[_insurer];
    }
}
