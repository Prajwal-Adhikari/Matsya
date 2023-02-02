//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./Token.sol";

/**
 * @title Decentralized exchange
 * @author Prawjal Adhikari
 * @notice An exchange that lets you to swap tokens.
 * @custom:todo 
 * Deposit Tokens
 * Withdraw Tokens
 * Check Balances
 * Make Orders
 * Cancel Orders
 * Fill Orders
 * Charge Fees
 * Track Fee Account
 * 
 */


contract Exchange {
    address public feeAccount;
    uint256 public feePercent;

    constructor(address _feeAccount, uint256 _feePercent){
        feeAccount = _feeAccount;
        feePercent = _feePercent;

    }

    //Deposite Token
    function depositeToken(address _token, uint256 _amount) public{
        //Transfer token to exchange
        Token(_token).transferFrom(msg.sender,address(this),_amount);
        //Update user balance
        //Emit an event
    }
    //Check Balance

}
