const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Exchange', () => {
  let exchange, deployer, feeAccount, token1;
  const feePercent = 10;
  
  beforeEach(async () => {
    
    const Exchange = await ethers.getContractFactory('Exchange');
    const Token = await ethers.getContractFactory("Token");


      token1 = await Token.deploy("CHILLAR","$CHILL",'1000000');
      accounts = await ethers.getSigners()
      deployer = accounts[0]
      feeAccount = accounts[1]
      user1 = accounts[2];

      exchange = await Exchange.deploy(feeAccount.address,feePercent);
    })

  describe('Deployment', () => {

    it('tracks the fee account', async () => {
      expect(await exchange.feeAccount()).to.equal(feeAccount.address)
    })

    it('tracks the fee percentage', async()=>{
        expect(await exchange.feePercent()).to.equal(feePercent);
    })

  })


  describe("Depositing token in the exchange", () => {

    beforeEach(async() => {
      
      let transaction, result;
      let amount = tokens(10);
      
      //Approve 

      transaction = await exchange.connect(user1).depositeToken(token1.address,amount);

        //Deposite token
    })

    describe("Success", () => {

    })

    describe("Failure", () => {
        
    })

  })

})
