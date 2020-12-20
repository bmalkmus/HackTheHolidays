const { expect } = require("chai");
const hre = require("hardhat");

describe("JokeList", function(){
        let jokeslist;
    beforeEach(async ()=>{
        const JokeList = await hre.ethers.getContractFactory("JokesList");
        jokeslist = await JokeList.deploy()

        await jokeslist.deployed();
    })
    it("Should have a start-up list of 4 jokes", async function(){
        expect(await jokeslist.getJokeCount()).to.equal(4);
    })

    it("Should have a joke count of 5 when joke is added", async function(){
        await jokeslist.addJoke("How do celebrities stay cool?", "They have many fans");
        const joke = await jokeslist.jokes(5)
        const count = await jokeslist.getJokeCount()

        expect(count).to.equal(5)
        expect (joke.punchLine).to.equal("They have many fans")
    })

    it("Should increase votes amount when funny", async function(){
        let joke = await jokeslist.jokes(1)
        await jokeslist.jokeFunny(joke.id)

        joke = await jokeslist.jokes(1);

        expect(joke.votes).to.equal(1);
    })

    it("Should decrease votes amount when not funny" , async function(){
        let joke = await jokeslist.jokes(1)
        await jokeslist.jokeFunny(joke.id);
        await jokeslist.jokeFunny(joke.id);
        await jokeslist.jokeFunny(joke.id);
        await jokeslist.jokeNotFunny(joke.id);

        joke = await jokeslist.jokes(1);

        expect(joke.votes).to.equal(2)
    })
});



