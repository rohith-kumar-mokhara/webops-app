import React, { useEffect, useState } from 'react'
import "./Card.css"
import sound from "../Sounds/Ricksound.mp3"
import axios from "axios"

function Card(props) {
  var [liked, setLiked] = useState(false);
  var [isRotated, setIsRotated] = useState(false);
  var [isFavourite,setIsFavourite] = useState(false);
  var [count,setCount] = useState(0);
  function makeSound() {
    new Audio(sound).play();
  }
  useEffect(isRotated ? () => {
    axios.get('https://official-joke-api.appspot.com/random_joke')
      .then(response => {
        props.data1[props.id] = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  } : () => {
    axios.get('https://api.quotable.io/quotes/random?limit=1')
      .then(response => {
        props.data2[props.id] = response.data[0];
      })
      .catch(error => {
        console.error(error);
      });
  }
    , [isRotated]);

  function handleClick(event) {
    let elem = event.target
    console.log(elem);
    if (event.target.className === "Card-item-joke" || event.target.className === "Card-item-quote") {
      makeSound();
      if (isRotated) {
        elem.style.transform = "rotateY(0deg)";
      }
      else {
        elem.style.transform = "rotateY(180deg)";
      }
      setIsRotated(!isRotated);
    }
    setCount(count+1);
    console.log("count is ",count);
    if(count>0&&count%2==0&&isFavourite){
      setIsFavourite(false);
      setLiked(false)
    }
  }
  function handleLiked() {
    setLiked((prevValue) => {
      return !prevValue;
    })
  }
  function handleLikeClick(data) {
    handleLiked();
    props.favouriteCards(data);
    setTimeout(() => {
      setIsFavourite(true);
    },700);
  }
  return (
    !isRotated ? (<div className='Card-item-joke' onClick={handleClick}>
      <div className="Card-heading-joke">
        <h1 className='Heading-joke' >{props.data1[props.id].type}</h1>
      </div>
      <div className="Card-content-joke">
      <p className='joke-say'>Joke</p>
        <p className='setup' >{props.data1[props.id].setup}</p>
        <p className='punchline' >{props.data1[props.id].punchline}</p>
      </div>
      {  !isFavourite? <button className='joke like' onClick={() => {
        handleLikeClick({ data1: props.data1[props.id], data2: props.data2[props.id] })
      }}>
        <i className={!liked ? "fa-regular fa-heart" : "fa-solid fa-heart"}></i>
        <span>Like</span>
      </button>:<div className='added-to-fav fav-joke'>Added to Favourites
      <i class="fa-solid fa-check fa-xl"></i>
      </div>}
    </div>) : (<div className='Card-item-quote' onClick={handleClick}>
      <div className="Card-content-quote">
        <p className='quote-say'>Quote</p>
        <p className='content' >{props.data2[props.id].content}</p>
        <p className='author' >- {props.data2[props.id].author}</p>
      </div>
   {  !isFavourite? <button className='quote like' onClick={() => {
        handleLikeClick({ data1: props.data1[props.id], data2: props.data2[props.id] })
      }}>
        <i className={!liked ? "fa-regular fa-heart" : "fa-solid fa-heart"}></i>
        <span>Like</span>
      </button>:<div className='added-to-fav fav-quote'>Added to Favourites
      <i class="fa-solid fa-check fa-xl"></i>
      </div>}
    </div>)
  )
}

export default Card;