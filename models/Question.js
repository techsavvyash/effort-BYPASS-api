const mongoose = require("mongoose");
const { ForeignKeyHelper } = require("../util/helpers");

const QuestionSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title of the Contest is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    timeConstraints: {
      type: String,
      required: [true, "time Constraints on the questions are required"],
    },
    memoryConstraints: {
      type: Number,
      required: [true, "Memory Constraints are required!"],
    },
    submissions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Submission",
        validate: {
          isAsync: true,
          validator: function (v) {
            return ForeignKeyHelper(submissions, v);
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
  },
  {
    collection: "Question",
  }
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
