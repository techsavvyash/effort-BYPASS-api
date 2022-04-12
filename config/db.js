const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    throw err;
  }

  console.log("****DB Connection, Successful!******");
};

module.exports = connectToDB;
