const User = require("../model/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verify = asyncHandler(async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(403)
      .send("not Authorzied token expired, please Login agian");
  }
});

module.exports = verify;
