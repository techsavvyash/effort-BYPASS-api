const User = require("../models/User");

exports.verifyRole = async (req, res, next) => {
  const { username } = req.session;

  const user = await User.findOne({ username });
};
