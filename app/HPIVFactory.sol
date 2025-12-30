// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./HPIVVault.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HPIV Factory
 * @dev Usine à Smart Contracts avec Whitelist d'Assureurs (KYC/KYB).
 */
contract HPIVFactory is Ownable {

    address[] public allVaults;
    mapping(address => bool) public isValidVault;

    // --- WHITELIST ASSUREURS ---
    mapping(address => bool) public isWhitelistedInsurer;

    event VaultCreated(
        address indexed vaultAddress,
        address indexed insurer,
        string riskName,
        uint256 capTotal
    );

    event InsurerStatusChanged(address indexed insurer, bool status);

    constructor() Ownable(msg.sender) {
        // Optionnel : S'ajouter soi-même par défaut ou ajouter l'adresse spécifique demandée
        isWhitelistedInsurer[0x912F9886Fb676750943fDeFC4c30d3cA927C3a72] = true;
    }

    /**
     * @dev Gestion de la whitelist par l'admin (DAO/Team).
     */
    function setInsurerStatus(address _insurer, bool _status) external onlyOwner {
        isWhitelistedInsurer[_insurer] = _status;
        emit InsurerStatusChanged(_insurer, _status);
    }

    /**
     * @dev Crée un Vault. RESTREINT aux assureurs whitelisted.
     */
    function createVault(
        IERC20 _asset,
        address _compliance,
        uint256 _capTotal,
        uint256 _maxCoverage,
        uint256 _durationInDays,
        string memory _riskName,
        string memory _description
    ) external returns (address) {
        // --- SÉCURITÉ : Vérification Whitelist ---
        require(isWhitelistedInsurer[msg.sender], "HPIV: Caller is not a whitelisted Insurer");

        HPIVVault newVault = new HPIVVault(
            _asset,
            _compliance,
            msg.sender,
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
}
