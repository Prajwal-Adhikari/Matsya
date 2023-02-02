//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Token {
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approve(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        //Check if the spender has atleast the amount to be transferred
        require(balanceOf[msg.sender] >= _value, "Token transfer failed.");

        //Check if the recepient is a valid address
        require(
            _to != address(0),
            "Cannot transfer token to an invalid address"
        );

        _transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        require(_spender != address(0));

        allowance[msg.sender][_spender] = _value;
        emit Approve(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        //check approval
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        //Reset allowance
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;

        //spend tokens
        _transfer(_from, _to, _value);
        return true;
    }

    //internal transfer function
    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_from != address(0));
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
    }
}
