const User = require("../models/User");

//middle ware to verify role for restricted routes
function checkToken(req, res, next) {
  req.user = null;
  const token = req.session.token;
  if (token == null) {
    res.user = null;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || user == null) {
      req.user = null;
    } else {
      req.user = user.username;
    }
  });
  next();
}

function verifyToken(req, res, next) {
  const id = req.params.id;
  req.user = null;
  jwt.verify(id, process.env.JWT_SECRET, (err, user) => {
    if (err || user == null) {
      req.user = null;
      res.send({
        status: false,
        message:
          "your url probably expired, or some error occured, please try again!",
      });
      console.log("executed");

      return;
    } else {
      req.user = user.username;
    }
  });
  console.log("verify token complete");
  next();
}

module.exports = { checkToken, verifyToken };
