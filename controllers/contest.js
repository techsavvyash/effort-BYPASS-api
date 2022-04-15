const Contest = require("../models/Contest");
const Question = require("../models/Question");

exports.postContest = async (req, res, next) => {
  const {
    id,
    Questions,
    writtenBy,
    difficultyLevel,
    participants,
    schedule,
    restricted,
  } = req.body;

  if (
    !id ||
    !Questions ||
    !writtenBy ||
    !difficultyLevel ||
    !schedule ||
    !restricted
  ) {
    res.send({ message: "Invalid Request", status: true }).status(403);
    return;
  }

  try {
    if (restricted && (participants.length === 0 || participants === null)) {
      res
        .send({
          message: "List of participants is required for restricted contests",
          status: false,
        })
        .status(403);
      return;
    }
    const contest = await Contest.create({
      id,
      Questions,
      writtenBy,
      difficultyLevel,
      schedule,
      restricted,
      participants,
    });

    res
      .send({ message: "Contest created successfully", status: true })
      .status(200);
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal Server Error", status: false }).status(500);
  }
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
  const contestId = req.params.id;
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

exports.updateContest = async (req, res, next) => {
  const {
    contestId,
    id,
    Questions,
    writtenBy,
    difficultyLevel,
    participants,
    schedule,
    restricted,
  } = req.body;
  if (!contestId) {
    res.send({ message: "Invalid request", status: false }).status(403);
    return;
  }

  try {
    if (restricted && (participants.length === 0 || participants === null)) {
      res.send({
        message: "Participant List is necessary for restricted contests.",
        status: true,
      });
      return;
    }
    await Contest.findByIdAndUpdate(contestId, {
      id: id,
      Questions: Questions,
      writtenBy: writtenBy,
      difficultyLevel: difficultyLevel,
      participants: participants,
      schedule: schedule,
      restricted: restricted,
    });
    res.send({ message: "Contest updated successfully.", status: true });
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal Server Error", status: true }).status(500);
  }
};
