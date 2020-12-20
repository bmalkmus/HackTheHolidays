import React , {useRef} from 'react'
import "./style.css"

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

    function hover(event){
        event.target.style.visibility="visible"
    }

    return (
        <div className="wrapper">
            <div className="fontBgd">
                <h1>Jokes on the Block</h1>
                <h4>Account: {account}</h4>
            </div>
            <form onSubmit={Submit}>
                <label>
                 Add a new Joke: 
                <input id="setUp" type="text" placeholder="Enter your set up here" ref={setUpRef} />
                <input id="punchLine" type="text" placeholder="Enter punchline here" ref={punchLineRef} />
                </label>
                <input type="submit" hidden={true}/>
            </form>
            <ul className = "jokeContainer">
                {[...jokes].sort((a,b)=>{return b.votes - a.votes}).map(joke => {
                    return(
                    <li className='indJoke' key = {joke.id}>
                        <span className="votes">Laugh Count:{joke.votes}</span>
                        <span className='setUp'>{joke.setUp}</span>
                        <span className='punchLine' onMouseOver={hover}>{joke.punchLine}</span>
                        <span className="buttons"><button data-id={joke.id} value="Funny" onClick={ButtonPress}>Funny</button><button onClick={ButtonPress} value="Not" data-id={joke.id}>Not Funny</button></span>
                    </li>
                    )
                })}
            </ul>
      </div>
    )
}


export default JokeList;