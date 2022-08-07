const jwt = require("jsonwebtoken");
module.exports.Auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send(false);
  const check = jwt.verify(token, process.env.JWT_SECRET);
  if (!check) return res.status(401).send(false);
  req.user = check.isAdmin;

  next();
};
module.exports.isAdmin = (req, res, next) => {
  if (req.user == true) {
    next();
  } else {
    return res.status(401).send("you are not admin");
  }
};
