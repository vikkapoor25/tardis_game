const express = require('express');

const scenarioRouter = require('./routers/scenarios')

const app = express();

app.use(express.json());
app.use('/scenarios', scenarioRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    title: "TARDIS API",
    description: "Historical deduction game API"
  });
});

module.exports = app;