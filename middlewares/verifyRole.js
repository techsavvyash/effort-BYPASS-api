const User = require("../models/User");

//middle ware to verify role for restricted routes
exports.verifyRole = async (req, res, next) => {
  const { id } = req.session.id;

  const user = await User.findOne({ id });
};
