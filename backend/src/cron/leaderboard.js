const { broadcastLeaderboard } = require('../config/websocket');

// Simulate leaderboard updates every 10 seconds
const startLeaderboardUpdates = () => {
  setInterval(async () => {
    await broadcastLeaderboard();
  }, 10000);
};

module.exports = { startLeaderboardUpdates };
