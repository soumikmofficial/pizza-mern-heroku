const { StatusCodes } = require("http-status-codes");
const Razorpay = require("razorpay");
const { BadRequestError } = require("../errors/errors");
BadRequestError;
const crypto = require("crypto");
const formidable = require("formidable");
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
let orderId;

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// todo: create order with razorpay... not saving to db yet
const createOrder = (req, res) => {
  const { amount } = req.body;
  let options = {
    amount: amount.toString(),
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };
  instance.orders.create(options, (error, order) => {
    if (error) {
      return res
        .status(500)
        .json({ status: "failed", message: "failed to create order" });
    }
    orderId = order.id;
    res.status(StatusCodes.CREATED).json({ status: "success", order });
  });
};

// todo: handler function for payment
const paymentHandler = async (req, res) => {
  const {
    total,
    orderItems,
    razorpayPaymentId,
    razorpaySignature,
    razorpayOrderId,
    user,
  } = req.body;

  const hash = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(orderId + "|" + razorpayPaymentId)
    .digest("hex");

  if (razorpaySignature === hash) {
    const orderDetails = {
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
      total,
      orderItems,
      user,
    };

    // modify inventory
    orderItems.map(async (item) => {
      const pizza = await Pizza.findOne({ _id: item.id });
      if (pizza.inventory < item.quantity) {
        throw new BadRequestError(
          `couldn't complete order as some of the items are not available anymore`
        );
      }
      pizza.inventory = pizza.inventory - item.quantity;
      pizza.save();
    });
    const order = await Order.create(orderDetails);
    return res.status(StatusCodes.CREATED).json({ order });
  }
};

// todo: get payment
const getPayment = async (req, res) => {
  const { paymentId } = req.params;
  const order = await Order.findOne({ paymentId });
  if (!order) {
    return res
      .status(404)
      .json({ status: "failed", message: "invalid payment id " });
  }
  const payment = await instance.payments.fetch(paymentId);
  if (!payment) {
    return res
      .status(404)
      .josn({ status: "failed", message: `couldn't verify payment` });
  }
  res.status(StatusCodes.OK).json({ status: "success", payment });
};

module.exports = { createOrder, getPayment, paymentHandler };
