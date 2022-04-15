const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/User");
const { generateJWT } = require("../util/helpers");
const bcrypt = require("bcryptjs");

exports.login = async (req, res, next) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(404).send({ message: "Invalid credentials", status: false });
    return;
  }

  const user = await User.findOne({ id: id });
  if (!user) {
    res.status(404).send({ message: "Invalid credentails", status: false });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  if (password === user.password) {
    req.session.id = generateJWT(user.id);
    req.session.roles = user.roles;
    res.status(200).send({ message: "Login Success!", status: true });
  } else {
    res.status(404).send({ message: "Invalid Credentails", status: false });
  }
};

exports.signup = async (req, res, next) => {
  const { id, name, password, roles } = req.body;

  if (!id || !name || !password || !roles) {
    res.status(401).send({ message: "Invalid credentials", status: false });
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const user = await User.create({ id, name, password, roles });
    res.send({
      message: "User created Successfully, proceed to login",
      user: user,
      status: true,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.staus(500).send({ message: "Internal Server Error", status: false });
  }
};

exports.logout = async (req, res, next) => {
  req.session = {};
  res.send({ message: "User logout successful", status: true });
};
