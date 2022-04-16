const mongoose = require("mongoose");
const { ForeignKeyHelper } = require("../util/helpers");
const Solution = require("./Solution");
const Submission = require("./Submission");

const QuestionSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title of the question is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    timeConstraints: {
      type: Number,
      required: [true, "time Constraints on the questions are required"],
    },
    memoryConstraints: {
      type: Number,
      required: [true, "Memory Constraints are required!"],
    },
    testCases: {
      type: String,
      required: [true, "Test Cases are required"],
    },

    submissions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Submission",
        validate: {
          isAsync: true,
          validator: function (v) {
            return ForeignKeyHelper(Submission, v);
          },
          message: `Submission doesn't exist`,
        },
      },
    ],
    topic: [
      {
        type: String,
        required: [true, "Question Topics are required!"],
      },
    ],
    visibility: {
      type: Boolean,
      required: [true, "Visibility of the question is necessary"],
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comments",
        validate: {
          isAsync: true,
          validator: function (v) {
            return ForeignKeyHelper(Comment, v);
          },
          message: `Comment doesn't exist`,
        },
      },
    ],
    solutions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Solution",
        validate: {
          isAsync: true,
          validator: function (v) {
            return ForeignKeyHelper(Solution, v);
          },
          message: `Submission doesn't exist`,
        },
      },
    ],
  },
  {
    collection: "Question",
  }
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
