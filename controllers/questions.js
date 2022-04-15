const Question = require("../models/Question");

exports.postQuestion = async (req, res, next) => {
  const {
    id,
    description,
    timeConstraints,
    memoryConstraints,
    submissions,
    title,
    topic,
    visibility,
    SPOJId,
    comments,
    solutions,
  } = req.body;

  if (
    !id ||
    !description ||
    !timeConstraints ||
    !memoryConstraints ||
    !title ||
    !topic ||
    !visibility
  ) {
    res.status(401).send({ message: "Invalid details", status: false });
    return;
  }

  try {
    const question = await Question.create({
      id,
      description,
      timeConstraints,
      memoryConstraints,
      submissions,
      title,
      topic,
      visibility,
      SPOJId,
      comments,
      solutions,
    });
    res.send({
      message: `Question added successfully with questionID: ${question.id}`,
      status: true,
    });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
};

exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({});
    res.status(200).send({ message: questions, status: true });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
};

exports.getQuestionDetails = async (req, res, next) => {
  const quesId = req.params.id;
  try {
    const ques = await Question.findOne({ id: quesId });
    if (!ques) {
      res.status(404).send({ message: "Not Found", status: false });
    }
    res.status(200).send({ message: ques, status: true });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
};

exports.updateQuestion = async (req, res, next) => {
  const {
    questionId,
    id,
    title,
    description,
    timeConstraints,
    memoryConstraints,
    submissions,
    topic,
    visibility,
    SPOJId,
    comments,
    solutions,
  } = req.body;

  if (!questionId) {
    res.send({ message: "Invalid request", status: false });
    return;
  }

  try {
    await Question.findByIdAndUpdate(questionId, {
      id: id,
      title: title,
      memoryConstraints: memoryConstraints,
      submissions: submissions,
      topic: topic,
      visibility: visibility,
      SPOJId: SPOJId,
      comments: comments,
      solutions: solutions,
      description: description,
      timeConstraints: timeConstraints,
    });

    res
      .send({ message: "Question updated successfully", status: true })
      .status(200);
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal Server Error", status: false }).status(500);
  }
};
