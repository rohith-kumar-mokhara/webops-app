import React, { useEffect, useState } from 'react'
import "./FavCard.css"
import sound from "../Sounds/Ricksound.mp3"

function FavCard(props) {
  var [isRotated, setIsRotated] = useState(false);

  function makeSound() {
    new Audio(sound).play();
  }

  function handleClick(event) {
    let elem = event.target
    console.log("element is ",elem)
    if (event.target.className === "Fav-Card-item-joke" || event.target.className === "Fav-Card-item-quote") {
      makeSound();
      if (isRotated) {
        elem.style.transform = "rotateY(0deg)";
      }
      else {
        elem.style.transform = "rotateY(180deg)";
      }
      setIsRotated(!isRotated);
    }
  }

  return (
    !isRotated ? (<div className='Fav-Card-item-joke' onClick={handleClick}>
      <div className="Fav-Card-heading-joke">
        <h1 className='Fav-Heading-joke' >{props.data1[props.id].type}</h1>
      </div>
      <div className="Fav-Card-content-joke">
      <p className='Fav-joke-say'>Joke</p>
        <p className='Fav-setup' >{props.data1[props.id].setup}</p>
        <p className='Fav-punchline' >{props.data1[props.id].punchline}</p>
      </div>
    </div>) : (<div className='Fav-Card-item-quote' onClick={handleClick}>
      <div className="Fav-Card-content-quote">
      <p className='Fav-quote-say'>Quote</p>
        <p className='Fav-content' >{props.data2[props.id].content}</p>
        <p className='Fav-author' >- {props.data2[props.id].author}</p>
      </div>
    </div>)
  )
}

export default FavCard;