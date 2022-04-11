const mongoose = require("mongoose");



const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    role: {
        type: String,
        required: [true, "Role is required!"]
    }
});

const User = mongoose.model("User", UserSchema)
module.exports = User ;