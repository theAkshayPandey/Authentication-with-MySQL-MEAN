const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const passport = require("../middleware/passport");

const asyncHandler = require("express-async-handler");

const router = express.Router();

router.post("/register", asyncHandler(insert), loggedin);
router.post("/login", asyncHandler(login), loggedin);
router.get(
  "/findme",
  passport.authenticate('jwt', { session: false }),
  loggedin
);

async function insert(req, res, next) {
  const user = req.body;
  console.log(`registering user`, user);
  req.user = await userController.insert(user);
  next();
}

async function login(req, res, next) {
  const user = req.body;
  console.log(`searching data`, user);
  const savedUser = await userController.login(user.email, user.password);
  console.log(savedUser);
  req.user = savedUser;
  next();
}

function loggedin(req, res) {
  const user = req.user;
  console.log(user);
  const token = authController.generateToken(user);
  res.json({
    user,
    token,
  });
}

module.exports = router;
