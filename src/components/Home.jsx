import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"
import Card from "./Card.jsx"
import "./Home.css"

var arr = [];
 
function Home(){

  var [joke,setJoke] = useState([]);
  var [quote,setQuote] = useState([]);
    var [favCards, setFavCards] = useState([]);

    function favouriteCards(data) {
      setFavCards((prevValue) => {
        return [...prevValue, data];
      })
    }
    
    useEffect(() => {
      axios.get('https://official-joke-api.appspot.com/random_ten')
        .then(response => {
          setJoke(response.data)
        })
        .catch(error => {
          console.error(error); 
        });
    }, []);
  
    useEffect(() => {
      axios.get('https://api.quotable.io/quotes/random?limit=10')
        .then(response => {
          setQuote(response.data)
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    arr=favCards;
    return  <div className='container'>
    {joke.map((elem, id) => {
      return <Card key={id} id={id} data1={joke} data2={quote} favouriteCards={favouriteCards} />
    })}
  </div>
}

export default Home;
export {arr}