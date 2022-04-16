const express = require("express");
const { postSubmissions } = require("../controllers/submission");
const router = express.Router();

router.route("/submit/:id").post(postSubmissions);

module.exports = router;
