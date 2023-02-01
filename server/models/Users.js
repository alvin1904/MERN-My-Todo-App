const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
