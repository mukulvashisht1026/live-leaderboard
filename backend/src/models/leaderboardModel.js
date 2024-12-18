import { findMaxVolume, findMinVolume } from '../utils/common.js';

const leaderboards = {};

export const UpdateLeaderboard = (traderBucketData, traderId, symbol, tradeDate) => {
  if (!leaderboards[tradeDate]) leaderboards[tradeDate] = {};
  if (!leaderboards[tradeDate][symbol]) leaderboards[tradeDate][symbol] = [];

  const leaderboardBySymbol = leaderboards[tradeDate][symbol];
  const existingTrader = leaderboardBySymbol.find((data) => data.traderId === traderId);
  
  if (existingTrader) {
    existingTrader.volume = traderBucketData.totalVolume;
    existingTrader.maxTransaction = findMaxVolume(traderBucketData.trades);
    existingTrader.minTransaction = findMinVolume(traderBucketData.trades);
    existingTrader.totalTransactions = traderBucketData.trades.length;
  } else {
    leaderboardBySymbol.push({
      traderId,
      volume: traderBucketData.totalVolume,
    //   rank: 0,
      maxTransaction: findMaxVolume(traderBucketData.trades),
      minTransaction: findMinVolume(traderBucketData.trades),
      totalTransactions: traderBucketData.trades.length,
    });
  }

  leaderboardBySymbol.sort((a, b) => b.volume - a.volume);
  let rank = 1;

  leaderboards[tradeDate][symbol] = leaderboardBySymbol.slice(0, 10).map((trader, index) => ({
    rank: index,
    ...trader,
  }));

  for (let i = 0; i < leaderboards[tradeDate][symbol].length; i++) {
    // console.log(leaderboards[tradeDate][symbol][i], "ith object");
    leaderboards[tradeDate][symbol][i].rank = i + 1;
  }
  
//   console.log(leaderboards[tradeDate][symbol] , "leaderboard is givingZero");
};

export const FetchLeaderboardBySymbol = (symbol, date) => {
  if (!leaderboards[date] || !leaderboards[date][symbol]) return [];
  return leaderboards[date][symbol];
};

export const FetchSymbols = () => {
  const symbols = new Set();
  for (const date in leaderboards) {
    Object.keys(leaderboards[date]).forEach((symbol) => symbols.add(symbol));
  }
  return Array.from(symbols);
};
