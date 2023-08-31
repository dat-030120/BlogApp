const validateMongoDbId = require("../until/validateMongodbId");
const { generateToken } = require("../config/jwtToken");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { generateRefToken } = require("../config/refToken");

const createUser = asyncHandler(async (req, res) => {
  //get enmail user
  const email = req.body.email;
  //check email
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // if user not found user create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  }
  throw new Error("User Already Exists");
});
const login = asyncHandler(async (req, res) => {
  const { login, password } = req.body;
  const findUser = await User.findOne({ login });
  if (!findUser) {
    return res.status(401).send("Unauthorized");
  }
  const isMatched = await findUser.comparePassword(password);
  if (!isMatched) {
    return res.status(400).send("Wrong Username or Password");
  }
  const refToken = await generateRefToken(findUser?._id);
  const updateUser = await User.findByIdAndUpdate(
    findUser.id,
    {
      refreshToken: refToken,
    },
    { new: true }
  );
  res.cookie("refreshToken", refToken, {
    httpOnly: true,
    secure: true,
    signed: false,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000 * 3,
  });
  res.json({
    _id: findUser?._id,
    login: findUser?.login,
    fullname: findUser?.fullname,
    email: findUser?.email,
    token: generateToken(findUser?._id),
  });
});

// get infor user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  validateMongoDbId(id);
  try {
    // find  user with id
    const user = await User.findById(id).select(
      "-refreshToken -role -password "
    );
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});
// dang xuat
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(user, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.RFJWT_KEY, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?.id);
    res.json(accessToken);
  });
});
//update account
const updatedUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fullname: req?.body?.fullname,
        email: req?.body?.email,
      },
      {
        new: true,
      }
    ).select("-refreshToken  -password ");
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  login,
  getUser,
  updatedUser,
  handleRefreshToken,
  logout,
};
