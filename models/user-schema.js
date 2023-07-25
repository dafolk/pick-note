const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
