import React from 'react';

const LeaderboardRow = ({ rank, traderId, volume, minTransaction, maxTransaction, totalTransactions, handleRowClick }) => {
  return (
    <div className="tile leaderboard-row" onClick={handleRowClick}>
      <span>{rank}</span>
      <span>{traderId}</span>
      <span>{volume}</span>
      <span>{minTransaction}</span>
      <span>{maxTransaction}</span>
      <span>{totalTransactions}</span>
    </div>
  );
};

export default LeaderboardRow;
