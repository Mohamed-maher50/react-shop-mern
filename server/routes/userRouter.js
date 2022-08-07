const express = require("express");
const router = express.Router();
const {
  POST_register,
  POST_login,
  POST_logout,
} = require("../controllers/userController");
const { Auth } = require("../util/Auth");

router.post("/register", POST_register);
router.post("/login", POST_login);
router.get("/logout", POST_logout);
router.get("/logedin", Auth, (req, res) => {
  res.send(true);
});
router.get("/admin", [Auth], (req, res) => {
  if (req.user == true) res.status(200).send(true);
  else res.status(401).send(false);
});
module.exports = router;
