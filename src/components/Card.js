import React,{useContext} from 'react';
import cardBack from '../images/card_back.png';
import { CardContext } from '../App';

const Card = ({card, matched}) => {
  const {handlePlayerChoice, disabledCards} = useContext(CardContext);
 
  function handleChoice(){
      if(!disabledCards){
          handlePlayerChoice(card);
          return;
      }
  };
  
  return (
    <div className='card'>
        <img src={card.src} alt={card.src} className={`card front ${matched ? 'matched': ''}`}/>
        <img src={cardBack} className='card back' alt='card back' onClick={()=>handleChoice()}/>
    </div>
  )
};

export default Card;
