const express = require('express');

const cors = require("cors");

const {scenarioRouter, explanationRouter} = require('./routers/scenarios')


const app = express();

app.use(cors());

app.use(express.json());
app.use('/scenarios', scenarioRouter);
app.use('/explanations', explanationRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    title: "TARDIS API",
    description: "Historical deduction game API"
  });
});

module.exports = app;