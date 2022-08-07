const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "you password max length < 6 char"],
  },
  firstName: {
    type: String,
    required: [true, "enter the first name"],
  },
  lastName: {
    type: String,
    required: [true, "enter the last name"],
  },
  isAdmin: Boolean,
});
const User = mongoose.model("User", userSchema);
module.exports = User;
