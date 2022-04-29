// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
import "hardhat/console.sol";

contract Token {
    string public name = "My hardhat token";
    string public symbol = "MHT";

    // Fixed amount of tokens
    uint256 public totalSupply = 1_000_000;

    address public owner;

    mapping(address => uint256) balances;

    // Constructor
    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    // External makes the function only callable from outside the contract
    function transfer(address to, uint256 amount) external {
        console.log("Sender balance is %s tokens", balances[msg.sender]);
        console.log("Trying to send %s tokens to %s", amount, to);

        require(balances[msg.sender] >= amount, "Not enough balance");

        balances[to] += amount;
        balances[msg.sender] -= amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
