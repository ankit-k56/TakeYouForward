const router = require("express").Router();

const { submit, getSubmissions } = require("../controllers/submitController");

router.post("/submit", submit);
router.get("/submissions", getSubmissions);

module.exports = router;
