import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart({ traderId, dateString, symbol }) {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    // Fetch data from the API whenever props change
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/traderData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            traderId,
            dateString,
            symbol,
          }),
        });

        const result = await response.json();
        console.log("API result:", result);

        if (result.statusCode === 200) {
          // Map API data to dataPoints
          const formattedDataPoints = result.data.trades.map((trade) => ({
            x: new Date(trade.timestamp),
            y: trade.volume,
          }));
          console.log("Formatted data points:", formattedDataPoints);

          setDataPoints(formattedDataPoints);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (traderId && dateString && symbol) {
      fetchData();
    }
  }, [traderId, dateString, symbol]); // Dependencies: Re-run when these props change

  const options = {
    title: {
      text: 'Trade Volume Over Time',
    },
    axisX: {
      title: 'Time',
      valueFormatString: 'HH:mm:ss', // Format for the timestamp
    },
    axisY: {
      title: 'Volume',
    },
    data: [
      {
        type: 'line',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}
