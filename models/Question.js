const mongoose = require("mongoose");


const QuestionSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, "ID is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    }, 
    timeConstraint: {
        type: String,
        required: [true, "time Constraints on the questions are required"]
    },
    memoryConstraints: {
        type: Number,
        required: [true, "Memory Constraints are required!"]
    }
})

