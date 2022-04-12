const mongoose = require("mongoose");
const Question = require("./Question");
const User = require("./User");

const ContestSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "ContestSchema is required!"],
    },
    Questions: [
      {
        type: mongoose.Types.ObjectId,
        required: [true, "Contest cannot be empty"],
        ref: "Question",
        validate: {
          isAsync: true,
          validator: function (v) {
            return ForeignKeyHelper(Question, v);
          },
          message: `Question doesn't exist`,
        },
      },
    ],
    writtenBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "Contest Setter is required"],
      ref: "User",
      validate: {
        isAsync: true,
        validator: function (v) {
          return ForeignKeyHelper(User, v);
        },
        message: `User doesn't exist`,
      },
    },
    difficultyLevel: {
      type: String,
      required: [true, "Difficulty Level of the contest is required"],
    },
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        validate: {
          isAsync: true,
          validator: function (v) {
            return ForeignKeyHelper(User, v);
          },
          message: `User doesn't exist`,
        },
      },
    ],
    schedule: {
      type: Date,
      required: [true, "Schedule of the contest is required"],
    },
  },
  {
    collection: "Contest",
  }
);

const Contest = mongoose.model("Contest", ContestSchema);

module.exports = Contest;
