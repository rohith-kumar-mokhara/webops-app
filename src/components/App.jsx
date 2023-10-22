import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Favourites from './Favourites.jsx';
import Home from './Home.jsx';
import "./App.css"

function App() {
  var [mode,setMode] = useState(true);
  var [count,setCount] = useState(0);

  function setDark(){
    document.querySelector("body").setAttribute("data-theme","dark")
    setMode(!mode);
  }
  function setLight(){
    document.querySelector("body").setAttribute("data-theme","light")
    setMode(!mode);
  }

  function toggleTheme(){
    setCount(count+1);
      if(count%2!=0){
        setLight();
      }
      else{
        setDark();
      }
  }

  return <div>
    <nav>
    {mode?<i className="fa-solid fa-sun" onClick={toggleTheme}></i>:<i className="fa-solid fa-moon" onClick={toggleTheme}></i>}
      <Link className="home" to="/">Home</Link>
      <h1 className='Header'>Card Chronicles: A Tale of Laughter and Inspiration</h1>
      <Link className='fav' to="/favourites" >Favourites</Link>
    </nav>
     <Routes>
      <Route path="/" element = {<Home />}></Route>
      <Route path="/favourites" element={<Favourites />}></Route>
    </Routes> 
  </div>
}

export default App;
