const request = require("request");

exports.compileCode = (data) => {
  request(
    {
      url: `${process.env.SPOJ_COMPILER_ENDPOINT}/submissions?access_token=${process.env.SPOJ_COMPILER_ACCESS_TOKEN}`,
      method: "POST",
      form: data,
    },
    (err, res, body) => {
      if (err) {
        console.log("Connection Problem: ", err);
        throw new Error("Error during submission call: ", err);
      }
      if (res) {
        console.log("body in compile code: ", res.body);
        return res;
      }
    }
  );
};

exports.checkSubmissionStatus = (id) => {
  request(
    {
      url: `${process.env.SPOJ_COMPILER_ENDPOINT}/submissions/${id}?access_token=${process.env.SPOJ_COMPILER_ACCESS_TOKEN}`,
      method: "GET",
    },
    (err, res, body) => {
      if (err) {
        console.log("Error: ", err);
        throw new Error("Error during checkingSubmissionStatus: ", err);
      }

      if (res) {
        return res;
      }
    }
  );
};
