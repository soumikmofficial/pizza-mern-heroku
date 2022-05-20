const express = require("express");
const router = express.Router();
const { dashboard } = require("../controllers/dashboardController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), dashboard);

module.exports = router;
