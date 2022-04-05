import React,{createContext, useState, useEffect} from 'react';
import './styke.css';
import Card from './components/Card';

export const initialCardsArray = [
    { "src": "./images/bulbasaur.png", matches: false },
    { "src": "./images/butterfree.png", matched: false },
    { "src": "./images/charmander.png", matched: false },
    { "src": "./images/pidgeotto.png", matched: false },
    { "src": "./images/pikachu.png", matched: false },
    { "src": "./images/squirtle.png", matched: false },
  ];

export const CardContext = createContext();

const App = () => {
  const [cards, setCards] = useState([]);
  // choice states
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  // turn states and others
  const [currentTurn, setCurrentTurn] = useState(0);
  const [disabledCards, setDisabledCards] = useState(false);
  const [gameOver, setGameover] = useState(false);
  // message
  const [message, setMessage] = useState('');

  // generate random card combination with added object id
   const randomizeCards = ()=>{
    let shuffledCards = [...initialCardsArray, ...initialCardsArray];
    return shuffledCards.map((singleCard)=> ({...singleCard, id:Math.random()}));
    }

  // initial game start
  const shuffledNewDeck = ()=>{
      setCards(randomizeCards());
      setFirstChoice(null);
      setSecondChoice(null);
      setCurrentTurn(0);
      setDisabledCards(false);
  };

  // filling the choice
  const handlePlayerChoice = (selectedCard)=>{
    //if first choice is there and and does not match the second one then put it in second choice
    if(!firstChoice){
        setFirstChoice(selectedCard);
    }else{
        firstChoice.id !== selectedCard.id && setSecondChoice(selectedCard);
    }
  };
  // checking whether the two cards are matching or not
  useEffect(()=>{
    if(currentTurn === 5){
        setGameover(true);
        setMessage('game over');
        return;
    }
    if(!gameOver){
        if(firstChoice && secondChoice){
            setDisabledCards(true); // setting disabled true when both card choices slots are filled 
            if(firstChoice.src === secondChoice.src){
                setCards(cards.map((singleCard)=>
                    singleCard.src === firstChoice.src ?
                    {...singleCard, matched: true} :
                    singleCard
                ))
                setGameover(true);
                setMessage('Winner Winner Homie you found the shit')
            }else{
                resetChoices();
            }
        }
    }
   
  },[firstChoice, secondChoice]);

  const resetChoices = ()=>{
      setFirstChoice(null);
      setSecondChoice(null);
      setDisabledCards(false);
      setCurrentTurn((currentTurn)=> currentTurn + 1);
  }

  console.log(firstChoice, secondChoice)

  return (
    <div className='game-board'>
        <button onClick={shuffledNewDeck} className='game-start-btn'>New game</button>
        {gameOver && <div>{message}</div>}
        <div>Turns: {currentTurn}</div>
        <CardContext.Provider value={{
            cards, setCards,
            handlePlayerChoice, disabledCards
        }}>
            <div className='cards-grid'>
                {cards.map((singleCard, index)=>{
                    return (
                        <div key={index}>
                            <Card
                                card={singleCard}
                                key={singleCard.id}
                                matched={singleCard.matched}
                            />
                        </div>
                    )
                })}
            </div>
        </CardContext.Provider>
    </div>
  )
};

export default App;
