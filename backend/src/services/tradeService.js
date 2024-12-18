import { AddNewTradeData, FetchTradesByTraderIdSymbolDateString } from "../models/tradeModel.js";

// API to handle new trade data
export const handleNewTrade = async (trade) => {
    // console.log('added trade is', trade);
    await AddNewTradeData(trade);   
};


export const getTrades = async (traderId, symbol, dateString) => {
    // console.log('skldfjslkdfjaslkdfjasklfjasldfsjdklfjksdf', traderId, symbol, dateString);
    const data = FetchTradesByTraderIdSymbolDateString(traderId, symbol, dateString);
    return data;
}