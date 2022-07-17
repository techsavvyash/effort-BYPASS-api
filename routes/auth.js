const express = require("express");
const { login, signup, logout } = require("../controllers/auth");
const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").get(logout);
module.exports = router;
