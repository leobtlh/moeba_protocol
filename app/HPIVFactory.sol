// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./HPIVVault.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HPIV Factory
 * @dev Usine à Smart Contracts mise à jour pour inclure les métadonnées.
 */
contract HPIVFactory is Ownable {

    address[] public allVaults;
    mapping(address => bool) public isValidVault;

    event VaultCreated(
        address indexed vaultAddress,
        address indexed insurer,
        string riskName,
        uint256 capTotal
    );

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Crée un Vault avec toutes les données de l'interface web.
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
