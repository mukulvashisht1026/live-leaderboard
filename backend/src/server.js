const http = require('http');
const app = require('./app');
const { initWebSocket } = require('./config/websocket');
const { startLeaderboardUpdates } = require('./cron/leaderboard');
const { performDailyTask, task } = require('./cron/updateDateCron');
const { getTrades, handleNewTrade } = require('./services/tradeService.js');
const { mockData } = require('./mockTrades.js');
const { GetTodaysDate } = require('./utils/dateUtils.js');
const { getRandomInteger } = require('./utils/common.js');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const initializeMockData = () => {
  try {

    console.log('Mock data loaded successfully.');
    const todaysDate = new Date();
    const pastDate = new Date(todaysDate); // Create a new Date object to avoid modifying todaysDate
    pastDate.setDate(todaysDate.getDate() - 1);
    // console.log(todaysDate.toISOString(), ' <<< todaysDate');
    mockData.forEach((trade) => {
      try {
       handleNewTrade({traderId: trade.traderId, symbol: trade.symbol,  timestamp: todaysDate.toISOString(), volume: getRandomInteger(500, 50000)})
       handleNewTrade({traderId: trade.traderId, symbol: trade.symbol,  timestamp: pastDate.toISOString(), volume: getRandomInteger(500, 50000 ) })
        
      } catch (error ) {
        console.error(`Error processing trade: ${error.message}`);
      }
      
      // .then((result) => console.log(`Trade processed: ${JSON.stringify(result)}`))
        // .catch((err) => console.error(`Error processing trade: ${err.message}`));
    });
  } catch (error) {
    console.error('Error loading mock data:', error.message);
  }
};


// Create HTTP server and attach WebSocket
const server = http.createServer(app);
initWebSocket(server);

// Start the leaderboard update logic
startLeaderboardUpdates();

performDailyTask();

// Initialize mock data
initializeMockData();

// Start the cron job
task.start();

// Initialize mock data
initializeMockData();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
