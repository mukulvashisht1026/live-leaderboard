import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import LeaderboardRow from './LeaderboardRow';
import SymbolDropdown from './SymbolDropdown';
import { fetchSymbolsFromAPI } from '../services/api';
import { mergeUniqueSymbols } from '../utils/symbolUtils';
import { useWebSocket } from '../hooks/useWebSocket';
import BottomDrawer from './BottomDrawer';
import BasicDatePicker from './BasicDatePicker';


const Leaderboard = ({ theme }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [symbols, setSymbols] = useState(['BTC', 'XRP', 'ETH']); // Default symbols
  const [selectedSymbol, setSelectedSymbol] = useState('BTC'); // Default selected symbol
  const WS_URL = 'ws://localhost:3000'; // Replace with your WebSocket URL
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // Update the state with the selected date
    console.log('Selected Date:', newDate?.toISOString()); // Log the date (formatted as ISO string)
  };


  const toggleDrawer = (open) => (event) => {
    console.log('drawer toggled')
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };



  // Fetch symbols and update the dropdown list
  useEffect(() => {
    const fetchSymbols = async () => {
      const fetchedSymbols = await fetchSymbolsFromAPI();
      const uniqueSymbols = mergeUniqueSymbols(symbols, fetchedSymbols);
      setSymbols(uniqueSymbols);
    };

    fetchSymbols();
  }, []); // Run only on mount

  // Handle WebSocket messages
  const handleWebSocketMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      // console.log('hello world....', data);
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  // Use WebSocket custom hook
  useWebSocket(WS_URL, selectedSymbol, selectedDate, handleWebSocketMessage);

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
  };

  return (
    <div className={`leaderboard leaderboard-container ${theme}`}>
         {/* Symbol Dropdown */}
         <div className='dropdown-container'>
      <SymbolDropdown
        symbols={symbols}
        selectedSymbol={selectedSymbol}
        handleSymbolChange={handleSymbolChange}
        theme={theme}
        className="symboldropdown"
      />
      <div className='datepicker-container'> 
        <BasicDatePicker onDateChange={handleDateChange}/>
      </div>
      </div>
      {/* Top Leaderboard Podium */}
      {/* <div className="leaderboard-top">
        {leaderboardData.slice(0, 3).map((data, index) => (
          <div key={data.rank} className={`podium podium-${index + 1}`}>
            <span className="rank">[{data.rank}]</span>
            <span className="trader">{data.traderId}</span>
            <span className="volume">{data.volume} VOLUME</span>
          </div>
        ))}
      </div> */}

     

      {/* Leaderboard Rows */}
      <div className={`leaderboard-header ${theme}`}>
  <span>Rank</span>
  <span>Trader</span>
  <span>Volume</span>
  <span>Maximum Transaction</span>
  <span>Minimum Transaction</span>
  <span>Total Transaction</span>
</div>
<div >
  {leaderboardData.length === 0 ? (
    // Centered message when there is no data
    <div className="no-data-message">
      Nothings here yet :/
    </div>
  ) : (
    // Render rows if data is available
    <TransitionGroup component="div" className="leaderboard-rows">
      {leaderboardData.map((data) => (
        <CSSTransition key={data.traderId} classNames="row-transition" timeout={2000}>
          <LeaderboardRow key={data.traderId} {...data} 
          handleRowClick={() => toggleDrawer(true)()}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )}
</div>
  {/* <BottomDrawer open={drawerOpen} toggleDrawer={toggleDrawer} /> */}
    </div>
  );
};

export default Leaderboard;
