import React, { useEffect, useState } from 'react'
import "./Favourites.css"
import { arr } from "./Home"
import FavCard from './FavCard.jsx';
import "./Favourites.css"

function Favourites() {
    const [favCardJoke, setFavCardJokes] = useState([]);
    const [favCardQuote, setFavCardQuotes] = useState([]);

    useEffect(() => {
        const prevFavJokes = JSON.parse(localStorage.getItem('favCardJokes')) || [];
        const prevFavQuotes = JSON.parse(localStorage.getItem('favCardQuotes')) || [];
        setFavCardJokes(prevFavJokes);
        setFavCardQuotes(prevFavQuotes);
    }, []);

    useEffect(()=>{ 
        for(let i=0;i<arr.length;i++){
            setFavCardJokes((prevValue)=>{
                console.log(arr[i].data1)
                return [...prevValue,arr[i].data1];
            })
        }
        for(let i=0;i<arr.length;i++){
            setFavCardQuotes((prevValue)=>{
                console.log(arr[i].data1)
                return [...prevValue,arr[i].data2];
            })
        }
    },[])

    useEffect(() => {
        localStorage.setItem('favCardJokes', JSON.stringify(favCardJoke));
        localStorage.setItem('favCardQuotes', JSON.stringify(favCardQuote));
    }, [favCardJoke, favCardQuote]);

    useEffect(() => {
        function clearLocalStorage(){
            localStorage.clear();
        };

        window.addEventListener('beforeunload', clearLocalStorage);
    }, []);

    return (
        <div className='container'>
            {favCardJoke.map((elem, id) => {
                return <FavCard key={id} id={id} data1={favCardJoke} data2={favCardQuote} />
            })}
        </div>
    );
}

export default Favourites;
