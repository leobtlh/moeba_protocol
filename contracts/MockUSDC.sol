// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "mUSDC") {
        // On se donne 1 million de jetons au déploiement
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    // Fonction pour que n'importe qui puisse obtenir des jetons de test
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
