const Contest = require("../models/Contest");
const Question = require("../models/Question");

exports.postContest = async (req, res, next) => {
  // const {}
};

exports.getContests = async (req, res, next) => {
  try {
    const contests = await Contest.find({});
    if (!contests) {
      res
        .status(500)
        .send({ message: "Internal Server Error", message: false });
    } else {
      res.status(200).send({ message: contests, status: true });
    }
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
};

exports.getContestDetails = async (req, res, next) => {
  const contestId = req.query.id;
  try {
    const contest = await Contest.findOne({ id: contestId });
    if (!contest) {
      res.status(404).send({ message: "Invalid Contest Id", status: false });
    } else {
      let questions = [];
      // maybe optimise this
      for (let i = 0; i < contest.Questions.length; i++) {
        const question = await Question.findOne({ id: Questions[i].id });
        questions.push({ title: question.title, id: question.id });
      }
      res.status(200).send({
        message: "fetch success",
        contest: contest,
        questions: questions,
        status: true,
      });
    }
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
};
