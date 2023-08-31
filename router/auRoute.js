const express = require("express");
const {
  createUser,
  login,
  getUser,
  updatedUser,
  handleRefreshToken,
  logout,
} = require("../controler/authCtrl");
const verify = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/", verify, getUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.put("/", verify, updatedUser);
module.exports = router;
