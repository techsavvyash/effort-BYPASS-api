const { postCompileReq, getCompiledOutput } = require("../controllers/compile");

const router = require("express").Router();

router.route("/compile").post(postCompileReq);
router.route("/compile/:id").get(getCompiledOutput);
module.exports = router;
