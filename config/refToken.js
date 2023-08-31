const jwt = require("jsonwebtoken");
require("dotenv").config;
const generateRefToken = (id) => {
  return jwt.sign({ id }, process.env.RFJWT_KEY, { expiresIn: "3day" });
};
module.exports = { generateRefToken };
