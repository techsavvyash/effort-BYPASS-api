const Solution = require("../models/Solution");

exports.postSolution = async (req, res, next) => {
  const { id, code, progLang, question, comments } = req.body;
  if (!id || !code || !progLang || !question) {
    res.status(403).send({ message: "Invalid request", status: false });
    return;
  }

  try {
    const solution = await Solution.create({
      id,
      code,
      progLang,
      question,
      comments,
    });
    if (!solution) {
      res.status(500).send({ message: "Internal Server Error", status: false });
      return;
    }

    res.status(200).send({ message: solution, status: true });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
};

exports.getSolution = async (req, res, next) => {
  const { questionId } = req.params.id;
  if (!questionId) {
    res.status(403).send({ message: "Question Id is required", status: false });
    return;
  }

  try {
    const solutions = Solution.find({ question: questionId });
    if (!solutions) {
      res.status(500).send({ message: "Internal server error", status: false });
      return;
    }

    res.send({ message: solutions, status: true }).status(200);
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal Server Error", status: false }).status(500);
  }
};

exports.updateSolution = async (req, res, next) => {
  const { id, question, code, progLang, comments, solutionId } = req.body;
  if (!id || !question || !code || !progLang || !comments) {
    res.send({ message: "Invalid data", status: false }).status(403);
    return;
  }

  try {
    await Solution.findByIdAndUpdate(solutionId, {
      id: id,
      code: code,
      progLang: progLang,
      question: question,
      comments: comments,
    });

    res
      .send({ message: "Solution updated successfully", status: true })
      .status(200);
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal server error", status: false }).status(500);
  }
};
