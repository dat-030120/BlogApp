const express = require("express");
require("dotenv").config();
const dbConnet = require("./config/mongodb");
const autRoute = require("./router/auRoute");
const { notFound, errorHandler } = require("./middlewares/erroHandler");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
dbConnet();

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", autRoute);

app.use(notFound);
app.use(errorHandler);

app.get("/test", (req, res) => {
  res.json("run");
});
app.listen(port, () => {
  console.log(`Server is run at PORT ${port}`);
});
