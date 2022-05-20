const express = require("express");
const router = express.Router();
const {
  getOrdersByUser,
  getAllOrders,
} = require("../controllers/orderController");
const { authenticateUser } = require("../middlewares/authentication");

router.route("/get-my-orders").get(authenticateUser, getOrdersByUser);
router.route("/get-all-orders").get(authenticateUser, getAllOrders);

module.exports = router;
