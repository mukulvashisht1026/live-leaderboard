export const findMaxVolume = (data) => {
    if (data.length === 0) return null;
    return Math.max(...data.map((item) => item.volume));
  };
  
  // Function to find minimum volume
export  const findMinVolume = (data) => {
    if (data.length === 0) return null;
    return Math.min(...data.map((item) => item.volume));
  };
  
  // Function to find the latest timestamp and its volume
export  const findLatestTimestampAndVolume = (data) => {
    if (data.length === 0) return null;
    const latestData = data.reduce((latest, current) =>
      new Date(latest.timestamp) > new Date(current.timestamp) ? latest : current
    );
    return { timestamp: latestData.timestamp, volume: latestData.volume };
  };
  

  export function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }