const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/errors");
const Pizza = require("../models/Pizza");
const User = require("../models/User");
const Review = require("../models/Review");
const Order = require("../models/Order");

const dashboard = async (req, res) => {
  let totalInventoryCount;
  let totalSales;

  const pizzas = await Pizza.find({});
  totalInventoryCount = pizzas.reduce((total, pizza) => {
    return (total += pizza.inventory);
  }, 0);

  const verifiedUsers = await User.find({ isVerified: true });

  const reviews = await Review.find({});

  const orders = await Order.find({});

  totalSales = orders.reduce((total, order) => {
    total += order.total;
    return total;
  }, 0);

  res.status(StatusCodes.OK).json({
    totalInventoryCount,
    verifiedUserCount: verifiedUsers.length,
    reviewCount: reviews.length,
    totalSales,
    pizzas,
  });
};

module.exports = { dashboard };
