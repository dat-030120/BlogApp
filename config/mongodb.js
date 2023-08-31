const { default: mongoose } = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xumdi3l.mongodb.net/?retryWrites=true&w=majority`;
const dbConnect = () => {
  try {
    const conn = mongoose.connect(uri);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;
