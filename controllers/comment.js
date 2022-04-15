const Comment = require("../models/Comment");

exports.postComment = async (req, res, next) => {
  const { id, content, entityId, entity } = req.body;

  if (!id || !content || !entity || !entity) {
    res.send({ message: "Invalid data", status: false }).status(403);
    return;
  }

  try {
    const comment = await Comment.create({ id, content, entity, entityId });
    res.send({ message: comment, status: true }).status(200);
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal Server Error", status: false }).status(500);
  }
};

exports.getComments = async (req, res, next) => {
  const { entityId } = req.params.id;

  if (!entityId) {
    res.send({ message: "Invalid Request", status: false }).status(403);
    return;
  }

  try {
    const comments = Comment.find({ entityId });
    if (!comments) {
      res.send({ message: "Invalid entity id", status: false }).status(403);
      return;
    }

    res.send({ message: comments, status: true }).status(200);
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal Server Error", status: false }).status(500);
  }
};
