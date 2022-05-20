const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require("../errors/errors");
const User = require("../models/User");
const crypto = require("crypto");
const { sendResetPasswordMail, createHash } = require("../utils");

const {
  createTokenUser,
  attachCookiesToResponse,
  sendVerificationMail,
} = require("../utils");
const Token = require("../models/Token");

// Todo: register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // ? checks if all required input are there
  if ((!name, !email, !password))
    throw new BadRequestError(`one or more inputs are missing`);
  // ? user alredy exists ?
  const isExistingUser = await User.findOne({ email });
  if (isExistingUser) throw new BadRequestError(`Couldn't process request`);
  // ? first account?
  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";
  // ? generate verification token
  const verificationToken = crypto.randomBytes(40).toString("hex");
  // ? send mail here
  await sendVerificationMail({
    name,
    email,
    verificationToken,
  });
  // ? create the User in db
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ user, message: "Please check your inbox to verify your email" });
};

// todo: verify email after registering
const verifyEmail = async (req, res) => {
  const { token, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError(`Email couldn't be verified`);

  if (user.verificationToken !== token)
    throw new UnauthenticatedError(`Email couldn't be verified`);

  user.isVerified = true;
  user.verificationToken = "";
  user.verified = Date.now();

  user.save();
  res
    .status(StatusCodes.OK)
    .json({ message: "account verification successful" });
};

// todo: login
const login = async (req, res) => {
  //? both email and password provided?
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError(`One or more fields are missing`);
  //? if user exists
  const user = await User.findOne({ email: email });
  if (!user) throw new UnauthenticatedError(`Invalid credentials`);
  //? is pssword correct?
  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new UnauthenticatedError(`Invalid credentials`);
  //? is user verified
  if (!user.isVerified)
    throw new UnauthenticatedError(`Couldn't authenticate user`);
  // ? create token user
  const tokenUser = createTokenUser(user);
  //? if token exists and is valid attach same token to cookies
  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) throw new UnauthenticatedError(`Authentication failed`);
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "logged in successfuly", tokenUser });
    return;
  }
  //? if no existing token, create new token and attach cookies to res
  refreshToken = crypto.randomBytes(10).toString("hex");
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];
  const tokenToCreate = { ip, userAgent, refreshToken };
  await Token.create(tokenToCreate);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "logged in successfuly", tokenUser });
};

// todo: logout
const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "logged out successfully" });
};

// todo: forgot password
const forgotPassword = async (req, res) => {
  //? email provided?
  const { email } = req.body;
  if (!email) throw new BadRequestError(`Please provide your email id`);
  //? if user exists, create password hashed token
  const user = await User.findOne({ email });
  if (user) {
    passwordResetToken = crypto.randomBytes(40).toString("hex");
    //? send reset mail with password token
    await sendResetPasswordMail({
      email,
      passwordResetToken,
      name: user.name,
    });
    //? update user with an password expiration date
    const tenMinutes = 1000 * 60 * 1000;
    user.passwordResetToken = createHash(passwordResetToken);
    user.passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    await user.save();
  }
  //? send response
  res.status(StatusCodes.OK).json({
    message: "Please check your email inbox ",
  });
};

// todo: reset Password
const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  if (!email || !token || !password)
    throw new BadRequestError(`password couldn't be reset`);
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();
    if (
      user.passwordResetToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordResetToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "password has been reset successfully" });
};

// todo: change password
const changePassword = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(`One or more fields are missing`);
  }
  const user = await User.findOne({ email });
  if (req.user.userId !== user._id.toString()) {
    throw new UnauthorizedError(`Unauthorized to change password`);
  }
  if (!user) {
    throw new BadRequestError(`Couldn't change password`);
  }
  user.password = password;
  user.save();
  res.status(StatusCodes.OK).json({ status: "success", message: "Successful" });
};

// todo: current user
const showCurrentUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId }).select("-password");
  const details = {
    name: user.name,
    email: user.email,
    role: user.role,
    userId: user._id,
  };
  return res.status(200).json({ user: details });
};

// todo: get all verified users
const getVerifiedUsers = async (req, res) => {
  const users = await User.find({ isVerified: true });
  res
    .status(StatusCodes.OK)
    .json({ status: "success", count: users.length, users });
};

module.exports = {
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
  showCurrentUser,
  changePassword,
  getVerifiedUsers,
};
