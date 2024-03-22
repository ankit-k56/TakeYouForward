const pool = require("../db/psql.js");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const buffer = require("buffer").Buffer;
const Redis = require("ioredis");
const axios = require("axios");

const redis = new Redis(process.env.REDIS_URL);

const submit = async (req, res) => {
  try {
    const { username, languageCode, code, stdin } = req.body;
    // if (!username || !languageCode || !code || !stdin) {
    //   return res
    //     .status(400)
    //     .json({ message: "Please provide all the required fields" });
    // }

    const b64code = buffer.from(code).toString("base64");
    const b64stdin = buffer.from(stdin).toString("base64");

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",

      params: {
        base64_encoded: "true",
        wait: true,
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.JUDGE0_APIKEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: languageCode,
        source_code: b64code,
        stdin: b64stdin,
      },
    };

    const response = await axios.request(options);
    console.log(response.data.stdout);
    let decodedOutput = "";
    if (response.data.stdout) {
      decodedOutput = Buffer.from(response.data.stdout, "base64").toString(
        "utf8"
      );
    }
    const language = response.data.language.name;
    const newSubmission = await pool.query(
      `INSERT INTO submissions (id ,username, language, code, stdin, stdout) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [uuidv4(), username, language, code, stdin, decodedOutput]
    );

    redis.rpush(
      "submissions",
      JSON.stringify({
        username,
        language,
        code,
        stdin,
        stdout: decodedOutput,
      })
    );

    res.status(200).json({ message: "Submission successful" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

const truncateString = (str) => {
  if (str.length > 100) {
    return str.substring(0, 100) + "...";
  } else {
    return str;
  }
};

const getSubmissions = async (req, res) => {
  try {
    const rSubmissions = await redis.lrange("submissions", 0, -1);
    if (rSubmissions.length > 0) {
      const allSubmissions = rSubmissions.map((submission) => {
        let scode = JSON.parse(submission).code;
        scode = truncateString(scode);
        return {
          username: JSON.parse(submission).username,
          language: JSON.parse(submission).language,
          code: scode,
          stdin: JSON.parse(submission).stdin,
          stdout: JSON.parse(submission).stdout,
        };
      });
      res.status(200).json({ submissions: allSubmissions });
      return;
    }
    const submissions = await pool.query(`SELECT * FROM submissions`);
    const { rows } = submissions;
    const allSubmissions = rows.map((row) => {
      let scode = row.code;
      scode = truncateString(scode);
      return {
        username: row.username,
        language: row.language,
        code: scode,
        stdin: row.stdin,
      };
    });
    res.status(200).json({ submissions: allSubmissions });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

module.exports = { submit, getSubmissions };
