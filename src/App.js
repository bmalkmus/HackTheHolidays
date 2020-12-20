import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {JOKES_ADDRESS, JOKES_ABI} from './config';
import JokeList from './components/JokeList'
import './App.css';

function App() {



  const [account, setAccount] = useState(null);
  const [jokeContract, setContract] = useState(null);
  const [jokesCount, setCount] = useState(0);
  const [jokes, setJokes] = useState([])
  const [loaded, setLoad] = useState(false);

  async function loadData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts();
    await setAccount(accounts[0]);
    const jokesList= new web3.eth.Contract(JOKES_ABI, JOKES_ADDRESS);
    setContract(jokesList);
    const jokeCount = await jokesList.methods.getJokeCount().call()
    await setCount(jokeCount)
    let temp = []
    for(let i = 1; i <= jokeCount; i++){
      const joke = await jokesList.methods.jokes(i).call()
      temp.push(joke)
    }
    setJokes(temp)
    setLoad(true);


  }

  useEffect(()=>{
    console.log("getting contract information")
    loadData()
  },[])

  function addJoke(setUp, punchLine){
    setLoad(false);
    jokeContract.methods.addJoke(setUp, punchLine).send({from: account})
    .once('receipt', (receipt) => {
      window.location.reload()
    })
  }

  function Funny(id) {
    setLoad(false)
    jokeContract.methods.jokeFunny(id).send({from: account})
    .once('receipt', (receipt) => {
      window.location.reload()
    })
  }
  function NotFunny(id) {
    setLoad(false)
    jokeContract.methods.jokeNotFunny(id).send({from: account})
    .once('receipt', (receipt) => {
      window.location.reload()
    })
  }

  return (
    <div className="App">
      {loaded 
      ? <JokeList jokes ={jokes} jokesCount={jokesCount} account={account} addJoke={addJoke} Funny={Funny} NotFunny={NotFunny}/> 
      : <div> Loading....</div>}
    </div>
  );
}

export default App;
