const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Commend id is required"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
    },
    entityId: {
      type: mongoose.Types.ObjectId,
      ref: "Question",
    },
    entity: {
      type: String,
      required: [true, "Entity the comment is associated with is necessary"],
    },
  },
  {
    collection: "Comment",
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
