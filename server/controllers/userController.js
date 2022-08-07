const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashPasswrod, comparePassword } = require("../util/hash");
const handleErrors = async (err) => {
  if (!err.errors) return [];
  const error = Object.values(err.errors);
  const totalErrors = [];

  error.forEach((ele) => {
    var key = ele.path;
    var obj = {};

    obj[key] = ele.properties.message;
    totalErrors.push(obj);
  });

  return { errorMessage: totalErrors };
};
module.exports.POST_register = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, passwordVerify, firstName, lastName } = req.body;

    if (password.length < 6)
      return res
        .status(400)
        .send({ errorMessage: { password: "password length < 6" } });
    if (password !== passwordVerify)
      return res
        .status(400)
        .send({ errorMessage: { password: "password not equal" } });
    const UserCheck = await User.findOne({ email: email });
    if (UserCheck)
      return res
        .status(400)
        .send({ errorMessage: { email: "this account already exist" } });
    const hashedPasswrod = await hashPasswrod(password);
    const user = await new User({
      email,
      password: hashedPasswrod,
      firstName,
      lastName,
    }).save();
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    res.status(200).send("success");
  } catch (err) {
    const errorMessage = await handleErrors(err);
    res.status(400).send(errorMessage);
  }
};

module.exports.POST_login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password))
    return res.status(400).send({ errorMessage: "please enter invalid email" });
  const user = await User.findOne({ email });
  console.log(user);
  if (!user)
    return res.status(400).send({ errorMessage: "can't find this account" });
  const comparePass = await comparePassword(password, user.password);
  if (!comparePass)
    return res.status(400).send({ errorMessage: "password not correct" });

  const token = jwt.sign(
    { user: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );

  res.cookie("jwt", token);
  res.send("done");
};

module.exports.POST_logout = (req, res) => {
  return res.clearCookie("jwt").status(200).send(false);
};
