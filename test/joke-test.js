const { expect } = require("chai");
const hre = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("JokeList", function(){
    it("Should have a start-up list of 4 jokes", async function(){
        const JokeList = await hre.ethers.getContractFactory("JokesList");
        const jokes = await JokeList.deploy()

        await jokes.deployed();
        expect(await jokes.getJokeCount()).to.equal(4);
    })
});

