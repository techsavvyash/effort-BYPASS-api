const express = require("express");
const { getQuestions, postQuestion } = require("../controllers/questions");
const router = express.Router();

router.route("/questions").get(getQuestions);
router.route("/questions").post(postQuestion);

module.exports = router;
