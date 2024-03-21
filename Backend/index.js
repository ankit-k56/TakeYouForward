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
  res.send("TakeUForward Task");
});
async function keepConnectionAlive() {
  try {
    const client = await pool.connect();
    await client.query(`SELECT * FROM poolAlive`);
    client.release();
    console.log("Connection kept alive:", new Date());
  } catch (error) {
    console.error("Error keeping connection alive:", error);
  } finally {
    setTimeout(keepConnectionAlive, 90000);
  }
}

app.listen(3000, async () => {
  keepConnectionAlive();
  console.log("Server is running on port 3000");
});
