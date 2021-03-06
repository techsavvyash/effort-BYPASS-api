const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.ForeignKeyHelper = (model, id) => {
  return new Promise((resolve, reject) => {
    model.findOne({ _id: id }, (err, result) => {
      if (result) {
        return resolve(true);
      } else
        return reject(
          new Error(
            `FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`
          )
        );
    });
  });
};

exports.generateJWT = (id) => {
  //the jwt contains the id and expires in 500 minutes
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 500 * 60 * 1000,
  });
};
