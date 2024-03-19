// import express from "express";
const express = require("express");
// import pool from "./db/psql.js";
const pool = require("./db/psql.js");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(3000, async () => {
  await pool.connect((err, client, release) => {
    if (err) {
      console.error("Error connecting to PostgreSQL:", err.stack);
      return;
    }
    console.log("Connected to PostgreSQL");
  });

  // Handle errors
  await pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
  });
  console.log("Server is running on port 3000");
});
