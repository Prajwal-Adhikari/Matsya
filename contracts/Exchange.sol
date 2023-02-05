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
    mapping(address => mapping(address => uint256)) public tokens;
    // mapping(uint256 => _Order);

    event Deposit(address token, address user, uint256 amount, uint256 balance);
    event Withdraw(address token, address user, uint256 amount, uint256 balance);

    struct _Order{
        //Attributes of an order
        uint256 id; //Uniquie identifier for an order in the blockchain
        address user; //User who placed the order
        address tokenGet; // Address of the token they receive
        uint256 amountGet; // Amount of the token they receive
        address tokenGive; // Address of the token they give
        uint256 amountGive; // Amount of the token they give
        uint256 timestamp; // Time when the order was placed
    }

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }


  
    ///Deposit
    function depositToken(address _token, uint256 _amount) public {
        // Transfer tokens to exchange
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));

        // Update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;

        // Emit an event
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    //Withdraw
    function WithdrawToken(address _token, uint256 _amount) public {

        //Ensure user has enough tokens to withdraw
        require(tokens[_token][msg.sender] >= _amount);

        //Transfer token to user
        Token(_token).transfer(msg.sender,_amount);

        //Update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;

        //emit an withdraw event
        emit Withdraw(_token,msg.sender,_amount,tokens[_token][msg.sender]);
    }

    function balanceOf(address _token, address _user)
        public
        view
        returns (uint256)
    {
        return tokens[_token][_user];
    }


    //MAKE AND CANCEL ORDERS

    /**  @dev Token Give : the token the trader wants to give; which token and how much
     *        Token Get : the token the trader wants to get; which token and how much
     
*/
    function placeOrder(address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) public {
        _Order(
            1, //id
            msg.sender, //user
            _tokenGet, //tokenGet
            _amountGet, //amountGet
            _tokenGive, //tokenGive
            _amountGive, //amountGive
            block.timestamp //timestamp
        )
    }

}
