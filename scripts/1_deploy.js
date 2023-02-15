const { ethers } = require("hardhat");

async function main() {
    // Fetch contract to deploy
    const Token = await ethers.getContractFactory("Token");
    const Exchange = await ethers.getContractFactory("Exchange");

    
  //Fetch account
    const accounts = await ethers.getSigners();
    const feeAccount = accounts[1].address;

    //fetched accounts
    console.log(`Account 1 : ${accounts[0].address} \n Account 2 : ${accounts[1].address}`);


    // Deploy contract
    const chillar =  await Token.deploy("CHILLAR","$CHILL","1000000");
    await chillar.deployed();
    console.log(`Chillar Deployed to : ${chillar.address}`);

    const sukka =  await Token.deploy("SUKKA","$SUKA","1000000");
    await sukka.deployed();
    console.log(`Sukka Deployed to : ${sukka.address}`);

    const morr =  await Token.deploy("MORR","$MOR","1000000");
    await morr.deployed();
    console.log(`Morr Deployed to : ${morr.address}`);

    const exchange = await Exchange.deploy(feeAccount,10);  
    await exchange.deployed();
    console.log(`Exchange deployed to : ${exchange.address}`);  

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
