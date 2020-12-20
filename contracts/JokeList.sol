pragma solidity ^0.7.3;

contract JokesList {
    uint public jokeCount = 0;

    struct Joke {
        uint id;
        string setUp;
        string punchLine;
        uint votes;
    }

    mapping (uint => Joke) public jokes;

    event JokeAdded(uint id, string setUp, string punchLine);

    event JokeVoted (uint id, uint votes);

    constructor() public {
        addJoke("What do you call a pudgy psychic?", "A Four-chin Teller");
        addJoke("Why do some couples go to the gym?", "Because they want their relationship to work out.");
        addJoke("My boss told me to have a good day", "So I went home");
        addJoke("I lost my job at the bank on my first day.", "A woman asked me to check her balance, so I pushed her over.");
    }

    function getJokeCount() public view returns (uint){
        return jokeCount;
    }

    function addJoke(string memory _setUp, string memory _punchLine) public {
        jokeCount ++; 
        jokes[jokeCount] = Joke(jokeCount, _setUp, _punchLine, 0);
        emit JokeAdded(jokeCount, _setUp, _punchLine);
    }

    function jokeFunny(uint _id) public {
        Joke memory _joke = jokes[_id];
        _joke.votes++;
        jokes[_id] = _joke;
        emit JokeVoted(_id, _joke.votes);
    }
    function jokeNotFunny(uint _id) public {
        Joke memory _joke = jokes[_id];
        _joke.votes--;
        jokes[_id] = _joke;
        emit JokeVoted(_id, _joke.votes);
    }
}