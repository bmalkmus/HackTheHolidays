import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {JOKES_ADDRESS, JOKES_ABI} from './config';
import './App.css';

function App() {

  const [account, setAccount] = useState(null);
  const [jokeContract, setContract] = useState(null);
  const [jokesCount, setCount] = useState(0);

  async function loadData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts();
    await setAccount(accounts[0]);
    const jokesList= new web3.eth.Contract(JOKES_ABI, JOKES_ADDRESS);
    setContract({jokesList});
    const jokeCount = await jokesList.methods.jokeCount().call()
    console.log(jokeCount)
    // await setCount(jokeCount)

    console.log([account, jokeContract])

  }

  useEffect(()=>{
    loadData()
    // jokeRender()
  },[])

  // useEffect(()=>{
  //   jokeRender()
  // },[jokeContract]);

  // function jokeRender(){
  //   console.log(jokeContract)
  //   const list = [];
  //   const numberJokes = jokeContract.getJokeCount();
  //   for (let i = 1; i <= numberJokes; i++){
  //     const joke = jokeContract.jokes[i]
  //     const template = <li>
  //       <span>{joke.setUp}</span>
  //       <span>{joke.votes}</span>
  //       <span>{joke.punchLine}</span>
  //       <div><button>Funny</button><button>Not Funny</button></div>
  //     </li>

  //     list.push(template)
  //   }
  //   return list;
  // }


  return (
    <div className="App">
      <h1>Account: {account}</h1>
      <h3>Joke Count: {jokesCount} </h3>
    </div>
  );
}

export default App;
