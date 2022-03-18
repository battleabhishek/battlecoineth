// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC20/IERC20.sol)
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract myToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("battle coin", "BattleCoin") public {
        _mint(msg.sender, initialSupply);
    _setupDecimals(0);
    }
}
