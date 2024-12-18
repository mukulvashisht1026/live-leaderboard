import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';

import './App.css';
import PermanentDrawerLeft from './components/BottomDrawer';
// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { TypeAnimation } from 'react-type-animation';

// import

function App() {
  const [theme, setTheme] = useState('dark'); // Default theme is light

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
    <div className={`App ${theme}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className='heading'> <h1>LEADERBOARD</h1><div className='medal'></div></div>
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Prize pool worth of 300K USD for top 10 traders',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "wait... there's more...",
        1000,
        'Personalized hoodies for top 3 traders',
        1000,
        'All the best',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
      {/* <PermanentDrawerLeft theme={theme}/> */}
      <header className="header">
       
      </header>
      <Leaderboard theme={theme} />
    </div>
    </>
  );
}

export default App;
