const mongoose = require("mongoose");
const { ForeignKeyHelper } = require("../util/helpers");
const Question = require("./Question");

const SubmissionSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "SubmissionID is required"],
    },
    questionId: {
      type: String,
      required: [true, "QuestionID is required!"],
      ref: "Question",
      validate: {
        isAsync: true,
        validator: function (v) {
          return ForeignKeyHelper(Question, v);
        },
        message: `Question doesn't exist`,
      },
    },
    status: {
      type: String,
      required: [true, "Status corresponding a solution is required"],
    },
  },
  {
    collection: "Submission",
  }
);

const Submission = mongoose.model("Submission", SubmissionSchema);
module.exports = Submission;
