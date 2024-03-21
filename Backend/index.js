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
app.listen(3000, async () => {
  // await pool.connect((err, client, release) => {
  //   if (err) {
  //     console.error("Error connecting to PostgreSQL:", err.stack);
  //     return;
  //   }
  //   console.log("Connected to PostgreSQL");
  // });

  // await pool.on("error", (err, client) => {
  //   console.error("Unexpected error on idle client", err);
  //   process.exit(-1);
  // });
  console.log("Server is running on port 3000");
});
