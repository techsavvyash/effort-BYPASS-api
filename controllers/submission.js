const { compileCode } = require("../config/judge");
const Question = require("../models/Question");

exports.postSubmissions = async (req, res, next) => {
  // const { id, code, progLang, submittedBy } = req.body;
  // const questionId = req.params.id;
  // if (!id || !questionId || !code || !progLang || !submittedBy) {
  //   res.status(500).send({ message: "Invalid request!", status: false });
  //   return;
  // }

  // // SPOJ API call here
  // try {
  //   const question = await Question.findOne({ id: questionId });

  //   const response = compileCode({
  //     source: code,
  //     compilerId: 44,
  //     timeLimit: question.timeConstraints,
  //     input: question.testCases,
  //   });
  //   if (response.statusCode >= 400 && response.statusCode <= 499) {
  //     res
  //       .send({ message: "Unauthorised", status: false })
  //       .status(response.statusCode);
  //     return;
  //   }
  //   if (response.statusCode === 201) {
  //     const submissionId = JSON.parse(response.body).id;
  //     console.log(response.body.id);
  //     res.send({ message: submissionId, status: true });
  //   } else {
  //     res.send({ message: JSON.parse(response.body), status: false });
  //   }
  // } catch (err) {
  //   console.log("Error: ", err);
  //   res.send({ message: "Internal Server Error", status: false });
  //   return;
  // }
  res.send("Hello from submissions api");
};

exports.getSubmissions = async (req, res, next) => {};
