const { expect } = require('chai');
const { ethers } = require('hardhat');
const { result } = require('lodash');
const { connect } = require('react-redux');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Exchange', () => {
  let exchange, deployer, feeAccount, token1;
  const feePercent = 10;

  beforeEach(async () => {

    const Exchange = await ethers.getContractFactory('Exchange');
    const Token = await ethers.getContractFactory("Token");


    token1 = await Token.deploy("CHILLAR", "$CHILL", '1000000');
    accounts = await ethers.getSigners()
    deployer = accounts[0]
    feeAccount = accounts[1]
    user1 = accounts[2];

    let transaction = await token1.connect(deployer).transfer(user1.address,tokens(100));
    result = await transaction.wait();
    exchange = await Exchange.deploy(feeAccount.address, feePercent);
  })

  describe('Deployment', () => {

    it('tracks the fee account', async () => {
      expect(await exchange.feeAccount()).to.equal(feeAccount.address)
    })

    it('tracks the fee percentage', async () => {
      expect(await exchange.feePercent()).to.equal(feePercent);
    })

  })


  describe("Depositing token in the exchange", () => {

    beforeEach(async () => {

      let transaction, result;
      let amount = tokens(10);




      //Approve 
      transaction = await token1.connect(user1).approve(exchange.address, amount);
      result = await transaction.wait();

      //Deposite token
      transaction = await exchange.connect(user1).depositeToken(token1.address, amount);
      result = await transaction.wait();
    })

    describe("Success", () => {
      it("track the token deposit", async() => {
        expect(await token1.balanceOf(exchange.address)).to.equal(amount);
            })
    })

    describe("Failure", () => {

    })

  })

})
