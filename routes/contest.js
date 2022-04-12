const express = require("express");
const {
  getContests,
  postContest,
  getContestDetails,
} = require("../controllers/contest");
const { route } = require("./auth");
const router = express.Router();

router.route("/contest").get(getContests);
router.route("/contest/:id").get(getContestDetails);
router.route("/contest").post(postContest);

module.exports = router;
