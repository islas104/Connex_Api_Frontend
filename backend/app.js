require("dotenv").config();
const express = require("express");
const { collectDefaultMetrics, register } = require("prom-client");
const cors = require("cors");

const app = express();

// Add CORS configuration middleware here
app.use(cors());

const port = process.env.PORT || 3001;
const authToken = process.env.AUTH_TOKEN || "mysecrettoken";

// Middleware to check Authorization header
const checkAuthorization = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (headerToken !== authToken) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

// Middleware to collect default Prometheus metrics
collectDefaultMetrics({ register });

// Endpoint to serve Prometheus-format metrics
app.get("/metrics", checkAuthorization, (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(register.metrics());
});

// Endpoint to return current server time in epoch seconds
app.get("/time", checkAuthorization, (req, res) => {
  const currentTimeEpoch = Math.floor(Date.now() / 1000);
  res.json({ epoch: currentTimeEpoch });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});

module.exports = app;
