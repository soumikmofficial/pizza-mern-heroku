const express = require("express");
const router = express.Router();
const {
  createOrder,
  getPayment,
  paymentHandler,
} = require("../controllers/paymentController");

router.post("/create-order", createOrder);
router.post("/handler", paymentHandler);
router.get("/:paymentId", getPayment);

module.exports = router;
