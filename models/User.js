const mongoose = require("mongoose");
const { ForeignKeyHelper } = require("../util/helpers");
const Submission = require("./Submission");

const UserSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    roles: [
      {
        type: String,
        required: [true, "Role is required!"],
      },
    ],
    submissions: {
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
  },
  {
    collection: "User",
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
