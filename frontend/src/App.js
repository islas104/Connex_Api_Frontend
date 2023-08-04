import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [serverTime, setServerTime] = useState(null);
  const [clientTime, setClientTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchServerTime = async () => {
    try {
      const response = await fetch("http://localhost:3001/time", {
        headers: {
          Authorization: "mysecrettoken",
        },
      });
      const data = await response.json();
      setServerTime(data.epoch);
    } catch (error) {
      console.error("Error fetching server time:", error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://localhost:3001/metrics", {
        headers: {
          Authorization: "mysecrettoken",
        },
      });
      const data = await response.text();
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  useEffect(() => {
    fetchServerTime();
    fetchMetrics();

    const interval = setInterval(() => {
      fetchServerTime();
      fetchMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (serverTime) {
      const interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const difference = currentTime - serverTime;
        setClientTime(currentTime);
        setTimeDifference(difference);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [serverTime]);

  useEffect(() => {
    if (serverTime && clientTime !== null) {
      setLoading(false);
    }
  }, [serverTime, clientTime]);

  return (
    <div className="App">
      {loading && (
        <div className="loading">
          <p className="loading-text">Loading...</p>
        </div>
      )}

      <div className="left-section">
        <h2>Server Time (Epoch Seconds)</h2>
        {!loading && serverTime}

        <h2>Time Difference</h2>
        {!loading && formatTimeDifference(timeDifference)}
      </div>

      <div className="right-section">
        <h2>Prometheus Metrics</h2>
        {!loading && <pre>{metrics}</pre>}
      </div>
    </div>
  );
}

function formatTimeDifference(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default App;
