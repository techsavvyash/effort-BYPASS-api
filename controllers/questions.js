const Question = require("../models/Question");

exports.postQuestion = (req, res, next) => {
  const { id, description, timeConstraint, memoryConstraints, submissions } =
    req.body;

  if (
    !id ||
    !description ||
    !timeConstraint ||
    !memoryConstraints ||
    !submissions
  ) {
    res.status(401).send({ message: "Invalid details", status: false });
    return;
  }

    try {
      const question = await Question.create({id, descriptionm, timeConstraint, memoryConstraints, submissions})
        res.send({message: "Question added successfully", status: true});
    } catch (err) {
    console.error("Error: ", err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
};

exports.getQuestions = (req, res, next) => {
    try {
        const questions = Question.find({});
        res.status(200).send({message: questions, status: true})
    } catch(err) {
        console.error("Error: ", err);
        res.status(500).send({message: "Internal Server Error", status: false})
    }
}


