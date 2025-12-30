// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./HPIVVault.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HPIV Factory
 * @dev Usine à Smart Contracts. Pas de changement majeur requis ici,
 * mais s'assure que le nouveau code du Vault est bien déployé.
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
        // Ajout de l'adresse de démo comme whitelisted par défaut
        isWhitelistedInsurer[0x912F9886Fb676750943fDeFC4c30d3cA927C3a72] = true;
    }

    function setInsurerStatus(address _insurer, bool _status) external onlyOwner {
        isWhitelistedInsurer[_insurer] = _status;
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
}
