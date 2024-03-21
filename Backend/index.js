const express = require("express");
const cors = require("cors");

const pool = require("./db/psql.js");

const { submit, getSubmissions } = require("./controllers/submitController.js");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/submissions", getSubmissions);
app.post("/submit", submit);

app.get("/", (req, res) => {
  res.send("Hello World");
});
async function keepConnectionAlive() {
  // Generate a random path to simulate a simple query
  const randomPath = Math.floor(Math.random() * 1000); // Adjust for your needs

  try {
    const client = await pool.connect();
    await client.query(`SELECT * FROM poolAlive`); // Replace with a harmless query
    client.release();
    console.log("Connection kept alive:", new Date());
  } catch (error) {
    console.error("Error keeping connection alive:", error);
  } finally {
    // Schedule the next keep-alive ping after 1.5 minutes (90 seconds)
    setTimeout(keepConnectionAlive, 90000);
  }
}

app.listen(3000, async () => {
  keepConnectionAlive();
  console.log("Server is running on port 3000");
});
