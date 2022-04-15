const {
  postSolution,
  getSolution,
  updateSolution,
} = require("../controllers/solution");

const router = require("express").Router();

router.route("/solution").post(postSolution);
router.route("/solution/:id").get(getSolution);
router.route("/solution/:id").patch(updateSolution);
module.exports = router;
