const { ethers } = require("hardhat");
const { expect } = require("chai");


const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(),"ether");
}

describe("Token", () => {
    let token;

    beforeEach(async () => {
        //Fetch token from the blockchain
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("Chillar","CHIL","1000000");
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

    //correct totalSuppy check
    it("has correct totalSupply",async ()=>{
        expect(await token.totalSupply()).to.equal(totalSupply);
    })
     })


});
