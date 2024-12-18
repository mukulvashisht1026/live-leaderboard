import { useEffect, useRef } from 'react';

export const useWebSocket = (url, selectedSymbol, selectedDate, onMessage) => {
  const ws = useRef(null);
  const reconnectInterval = useRef(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current); // Clear reconnect interval on success
        reconnectInterval.current = null;
      }
      // Subscribe to the selected symbol
      const dateString = selectedDate ? selectedDate.format('YYYY-MM-DD') : new Date();
      console.log('sending message with date123123123: ', dateString);
      console.log('daetestring ... . .', selectedDate);

      ws.current.send(JSON.stringify({ type: 'subscribe', symbol: selectedSymbol , date: dateString}));
    };

    ws.current.onmessage = (event) => {
      if (onMessage) {
        onMessage(event);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed. Attempting to reconnect...');
      attemptReconnect();
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.current.close();
    };
  };

  const attemptReconnect = () => {
    if (!reconnectInterval.current) {
      reconnectInterval.current = setInterval(() => {
        console.log('Attempting to reconnect to WebSocket...');
        connectWebSocket();
      }, 5000); // Retry every 5 seconds
    }
  };

  useEffect(() => {
    connectWebSocket();

    // Cleanup on component unmount
    return () => {
      if (ws.current) ws.current.close();
      if (reconnectInterval.current) clearInterval(reconnectInterval.current);
    };
  }, [url, selectedSymbol, selectedDate]); // Re-run on URL or selectedSymbol change

  return ws.current;
};
