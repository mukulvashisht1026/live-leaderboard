import { FetchSymbols } from "../models/leaderboardModel.js";

export const getSymbols = async () => {
    const symbols = FetchSymbols();
    console.log(symbols, ' <<<< fetched symbols are');
    return symbols;
}