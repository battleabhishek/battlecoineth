pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract myToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("battle coin", "BattleCoin") {
        _mint(msg.sender, initialSupply);
    _setupDecimals(0);
    }
}