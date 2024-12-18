const WebSocket = require('ws');
const { getLeaderboard } = require('../services/leaderboardService');
const { GetDateFromTimestamp, GetTodaysDate } = require('../utils/dateUtils');

let clients = [];

const initWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push({ ws, symbol: null, date: null }); // Add the client with an initial null symbol

    ws.on('message', async (message) => {
      try {
        const { type, symbol, date } = JSON.parse(message);
        const inputDate = date ? GetDateFromTimestamp(date) : GetTodaysDate();
        console.log('incomming date is >>>>>> ', inputDate , date );
        if (type === 'subscribe' && symbol) {
          // Update the client's subscribed symbol
          const client = clients.find((client) => client.ws === ws);
          if (client) { 
            client.symbol = symbol;
            client.date = inputDate;
          }
          // Send initial leaderboard data for the selected symbol
          const leaderboardData = await getLeaderboard(symbol, inputDate);
          ws.send(JSON.stringify(leaderboardData));
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clients = clients.filter((client) => client.ws !== ws);
    });
  });

  return wss;
};

const broadcastLeaderboard = async () => {
  // For each client, send leaderboard data for their selected symbol
  for (const client of clients) {
    if (client.symbol && client.ws.readyState === WebSocket.OPEN) {
      const leaderboardData = await getLeaderboard(client.symbol, client.date);
      client.ws.send(JSON.stringify(leaderboardData));
    }
  }
};

module.exports = { initWebSocket, broadcastLeaderboard };
