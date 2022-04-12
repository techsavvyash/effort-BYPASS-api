const express = require("express");
const {
  getQuestions,
  postQuestion,
  getQuestionDetails,
} = require("../controllers/questions");
const router = express.Router();

router.route("/questions").get(getQuestions);
router.route("/questions").post(postQuestion);
router.route("/questions/:id").get(getQuestionDetails);

module.exports = router;
