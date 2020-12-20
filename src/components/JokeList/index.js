import React , {useRef} from 'react'

function JokeList({jokes, account, jokesCount, addJoke, Funny, NotFunny}) {
    const setUpRef = useRef();
    const punchLineRef = useRef();

    function Submit(event){
        event.preventDefault();
        const setUp = setUpRef.current.value;
        const punchLine = punchLineRef.current.value;
        addJoke(setUp, punchLine);

    }

    function ButtonPress(event){
        if(event.target.value === "Funny"){
            Funny(event.target.dataset.id)
        }
        else{
            NotFunny(event.target.dataset.id)
        }
    }
    return (
        <div>
            <h1>Account: {account}</h1>
            <h3>Joke Count: {jokesCount} </h3>
            <form onSubmit={Submit}>
                <label>
                 Add a new Joke: 
                <input id="setUp" type="text" placeholder="Enter your set up here" ref={setUpRef} />
                <input id="punchLine" type="text" placeholder="Enter punchline here" ref={punchLineRef} />
                </label>
                <input type="submit" hidden={true}/>
            </form>
            <ul>
                {[...jokes].map(joke => {
                    return(
                    <li key = {joke.id}>
                        <span>{joke.setUp}</span>
                        <span>{joke.punchLine}</span>
                        <span>{joke.votes}</span>
                        <span><button data-id={joke.id} value="Funny" onClick={ButtonPress}>Funny</button><button onClick={ButtonPress} value="Not" data-id={joke.id}>Not Funny</button></span>
                    </li>
                    )
                })}
            </ul>
      </div>
    )
}


export default JokeList;