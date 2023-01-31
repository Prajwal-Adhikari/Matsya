//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Token{

    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply;

    mapping (address => uint256) public balanceOf;
    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply){
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
        
    }

    function transfer(address _to, uint256 _value) public returns(bool success){

        //Check if the spender has atleast the amount to be transferred
        require(balanceOf[msg.sender] >= _value,"Token transfer failed.");
        
        //Check if the recepient is a valid address
        require(_to != address(0),"Cannot transfer token to an invalid address");
        //Deduct transfer amount from the spender
        balanceOf[msg.sender] -= _value;

        //Credit the transfer amount to the receiver 
        balanceOf[_to] += _value;

        //emit the transfer event here
        emit Transfer(msg.sender,_to,_value);
        return true;
        
    }

}
