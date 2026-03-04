// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HPIVCompliance
 * @dev Registre centralisé KYC/AML pour le protocole Moeba.
 */
contract HPIVCompliance is Ownable {

    // Mapping pour stocker le statut de chaque adresse (true = autorisé)
    mapping(address => bool) private whitelisted;

    // Events pour la traçabilité (très important pour un audit)
    event UserWhitelisted(address indexed user);
    event UserBlacklisted(address indexed user);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Ajoute un utilisateur vérifié (KYC validé)
     */
    function addToWhitelist(address _user) external onlyOwner {
        whitelisted[_user] = true;
        emit UserWhitelisted(_user);
    }

    /**
     * @dev Retire un utilisateur (utile en cas de sanctions ou fin de validité KYC)
     */
    function removeFromWhitelist(address _user) external onlyOwner {
        whitelisted[_user] = false;
        emit UserBlacklisted(_user);
    }

    /**
     * @dev Fonction appelée par les Vaults pour vérifier si un transfert est légal
     */
    function isAllowed(address _user) external view returns (bool) {
        return whitelisted[_user];
    }
}
