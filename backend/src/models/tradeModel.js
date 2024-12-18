import { GetDateFromTimestamp } from '../utils/dateUtils.js';
import { UpdateLeaderboard } from './leaderboardModel.js';

const tradeBucketsEachDay = {};

export const AddNewBucketForDate = (date) => {
  if (!tradeBucketsEachDay[date]) {
    tradeBucketsEachDay[date] = {};
  }
};

export const AddNewTradeData = async (trade) => {
  const { traderId, symbol, timestamp, volume } = trade;
  const tradeDateBucketKey = GetDateFromTimestamp(timestamp);

  let bucket = tradeBucketsEachDay[tradeDateBucketKey];

  if (!bucket) {
    AddNewBucketForDate(tradeDateBucketKey);
    bucket = tradeBucketsEachDay[tradeDateBucketKey];
  }

  if (!bucket[symbol]) {
    bucket[symbol] = {};
  }
 
  if (!bucket[symbol][traderId]) {
    bucket[symbol][traderId] = {
      totalVolume: volume,
      trades: [{ volume, timestamp }],
    };
  } else {
    bucket[symbol][traderId].totalVolume += volume;
    bucket[symbol][traderId].trades.push({ volume, timestamp });
  }
  
  await UpdateLeaderboard(bucket[symbol][traderId], traderId, symbol, tradeDateBucketKey);
};

export const FetchTradesByTraderIdSymbolDateString = (traderId, symbol, dateString) => {
  const bucket = tradeBucketsEachDay[dateString];
  if (!bucket) throw new Error('No bucket found for this date');

  const symbolData = bucket[symbol];
  if (!symbolData) throw new Error(`No data for symbol "${symbol}" on date ${dateString}`);

  const traderInfo = symbolData[traderId];
  if (!traderInfo) throw new Error('No data found for this trader');

  return traderInfo;
};
