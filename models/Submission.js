const mongoose = require("mongoose");
const { ForeignKeyHelper } = require("../util/helpers");
const Question = require("./Question");
const User = require("./User");

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
    code: {
      type: String,
      required: [true, "Code corresponding the submission is required"],
    },
    progLang: {
      type: String,
      required: [true, "Programming language of the submission is required!"],
    },
    submittedBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "User id for the submitting user is required"],
      ref: "User",
      validate: {
        isAsync: true,
        validator: function (v) {
          return ForeignKeyHelper(User, v);
        },
        message: `User doesn't exist`,
      },
    },
  },
  {
    collection: "Submission",
  }
);

const Submission = mongoose.model("Submission", SubmissionSchema);
module.exports = Submission;
