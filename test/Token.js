const { ethers } = require("hardhat");
const { expect } = require("chai");


const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether");
}

describe("Token", () => {
    let token, accounts, deployer, receiver;

    beforeEach(async () => {
        //Fetch token from the blockchain
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("Chillar", "CHIL", "1000000");

        accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver = accounts[1];

    })

    describe('Deployment', () => {

        const name = "Chillar";
        const symbol = "CHIL";
        const decimals = 18;
        const totalSupply = tokens("1000000");
        //correct name test
        it("has correct name", async () => {
            expect(await token.name()).to.equal(name);
        })

        //correct symbol check
        it("should have correct symbol", async () => {
            expect(await token.symbol()).to.equal(symbol);
        })

        //correct decimals check
        it("should have 18 decimals", async () => {
            expect(await token.decimals()).to.equal(decimals);
        })

        //deployer balance check
        it("Deployer should have all the initial supply", async () => {
            expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
        })

        //correct totalSuppy check
        it("has correct totalSupply", async () => {
            expect(await token.totalSupply()).to.equal(totalSupply);
        })
    })



    describe('Token transfer', () => {
        let amount, transaction, result;

        describe("Success", () => {
            beforeEach(async () => {
                amount = tokens(100);
                transaction = await token.connect(deployer).transfer(receiver.address, amount);    //We need to connect deployer to the smart contract as this deployer is not only reading but making changes in the state of the blockchain.
                result = await transaction.wait();
            })

            it('Transfers token balance', async () => {

                //log balances before transfer
                console.log("Deployer balance before transaction : ", await token.balanceOf(deployer.address))
                console.log("Receiver balance before transaction : ", await token.balanceOf(receiver.address))

                //Transfer tokens

                //log balances after transfer
                // console.log("Deployer balance after transfer:",await token.balanceOf(deployer.address));
                // console.log("Receiver balance after transfer :", await token.balanceOf(receiver.address));


                it("Emit transfer event", async () => {
                    const firstEvent = result.event[0];
                    expect(firstEvent.event).to.equal("Transfer");
                    const args = firstEvent.args;
                    expect(args.from).to.equal(deployer.address);
                    expect(args.to).to.equal(receiver.address);
                    expect(args.value).to.equal(amount);
                    
                })


            })
        })

        describe("Failure",()=>{
            it("should reject insufficient balances", async()=>{
                //Lets try to transfer more than the deployer has like 100M tokens
                const invalidTokenAmount = tokens(100000000);
                await expect(token.connect(deployer).transfer(receiver.address,invalidTokenAmount)).to.be.reverted;
            })

            it("should reject token transfer to zero address", async() =>{
                const  amount = tokens(100);
                const zeroAddress = "0x0000000000000000";
                await expect(token.connect(deployer).transfer(zeroAddress,amount));
            })
        })
    })



});


