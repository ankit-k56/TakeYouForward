const pool = require("../db/psql.js");
const express = require("express");

const submit = async (req, res) => {
  try {
    const { username, language, code, stdin } = req.body;
    const newSubmission = await pool.query(
      `INSERT INTO submissions (username, language, code, stdin) VALUES ($1, $2, $3, $4)`,
      [username, language, code, stdin]
    );
    res.status(200).json({ message: "Submission successful" });
  } catch (err) {
    res.status(400).json({ message: err });
  }

  //   const { username, language, code, stdin } = req.body;

  //   pool.query(
  //     `INSERT INTO submissions (username, language, code, stdin) VALUES ($1, $2, $3, $4)`,
  //     [username, language, code, stdin],
  //     (err, result) => {
  //       if (err) {
  //         res.status(400).send(err);
  //       }
  //       res.status(200).send("Submission successful");
  //     }
  //   );
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
    const submissions = await pool.query(`SELECT * FROM submissions`);
    const { rows } = submissions;
    const allSubmissions = rows.map((row) => {
      const scode = row.code;
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
    res.status(400).json({ message: err });
  }
};

module.export = { submit, getSubmissions };
