const mongoose = require("mongoose");
const Comment = require("./Comment");
const Question = require("./Question");

const SolutionSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Solution ID is required"],
    },
    code: {
      type: String,
      required: [true, "Solution code is required"],
    },
    progLang: {
      type: String,
      required: [true, "Programming Language is required"],
    },
    question: {
      type: mongoose.Types.ObjectId,
      ref: "Question",
      validate: {
        isAsync: true,
        validator: function (v) {
          return ForeignKeyHelper(Question, v);
        },
        message: `Question doesn't exist`,
      },
      required: [true, "Question corresponding the solution is required"],
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        validate: {
          isAsync: true,
          validator: function (v) {
            return ForeignKeyHelper(Comment, v);
          },
          message: `Submission doesn't exist`,
        },
      },
    ],
  },
  {
    collection: "Solution",
  }
);

const Solution = mongoose.model("Solution", SolutionSchema);

module.exports = Solution;
