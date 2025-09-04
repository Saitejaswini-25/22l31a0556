const express = require("express");
const { getToken, sendLog, loggingMiddleware } = require("./logger");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggingMiddleware);

// ✅ Home route
app.get("/", (req, res) => {
  sendLog("backend", "info", "express", "Home route accessed");
  res.send("Hello! Backend logging is working ✅");
});

// ✅ Error route
app.get("/error", (req, res) => {
  sendLog("backend", "error", "handler", "Something went wrong in backend");
  res.status(500).send("Error simulated ❌");
});

// ✅ Database route
app.get("/db", (req, res) => {
  sendLog("backend", "warn", "database", "Database query took too long");
  res.send("Database log sent ⚠️");
});

// Start server
app.listen(PORT, async () => {
  await getToken();
  sendLog("backend", "info", "service", "🚀 Server started successfully");
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});