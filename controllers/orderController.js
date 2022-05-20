const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const { BadRequestError } = require("../errors/errors");

// todo: get all orders of single user
const getOrdersByUser = async (req, res) => {
  const { userId } = req.user;
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  if (!orders) throw new BadRequestError(`No orders were found`);
  res.status(StatusCodes.OK).json({ status: "success", orders });
};

// todo; get all orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res
    .status(StatusCodes.OK)
    .json({ status: "success", count: orders.length, orders });
};

module.exports = { getOrdersByUser, getAllOrders };
