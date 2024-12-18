import { FetchLeaderboardBySymbol } from "../models/leaderboardModel.js";


// Function to get the leaderboard for a specific symbol
export const getLeaderboard = async (symbol, date) => {
    // console.log('symbol is > ' , symbol, date);
  return FetchLeaderboardBySymbol(symbol, date);
};






