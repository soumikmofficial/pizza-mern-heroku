const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authentication");
const {
  login,
  register,
  verifyEmail,
  logout,
  resetPassword,
  forgotPassword,
  showCurrentUser,
  changePassword,
  getVerifiedUsers,
} = require("../controllers/authControllers.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify-email").post(verifyEmail);
router.route("/reset-password").post(resetPassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/change-password").post(authenticateUser, changePassword);
router.route("/logout").delete(authenticateUser, logout);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/get-verified-users").get(authenticateUser, getVerifiedUsers);

module.exports = router;
