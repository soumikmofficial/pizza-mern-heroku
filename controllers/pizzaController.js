const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/errors");
const Pizza = require("../models/Pizza");

// todo: get all pizzas
const getAllPizzas = async (req, res) => {
  let queryObject = {};

  const { name, category } = req.query;

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (category) queryObject.category = category;

  const result = Pizza.find(queryObject).sort({ inventory: -1 });

  const pizzas = await result;
  res.status(StatusCodes.OK).json({ count: pizzas.length, pizzas });
};

// todo: admin sets the inventory size
const updateAdminInventory = async (req, res) => {
  const { quantity, id } = req.body;

  if (!quantity || !id)
    throw new BadRequestError(`One or more fields are missing`);

  const pizza = await Pizza.findOne({ _id: id });
  if (!pizza) throw new BadRequestError(`Item not found in inventory`);
  if (quantity - pizza.inventory > 200)
    throw new BadRequestError(`One or more fields are missing`);

  pizza.inventory = quantity;
  updatedPizza = await pizza.save();

  res.status(StatusCodes.OK).json({ status: "success", updatedPizza });
};

// todo: create pizza
const createNewPizza = async (req, res) => {
  const { name, category, image, description, prices } = req.body;
  const varients = ["small", "medium", "large"];

  if (!name || !category || !image || !description || !prices) {
    throw new BadRequestError(`one or more fields are missing`);
  }

  const pizza = await Pizza.create({
    name,
    category,
    image,
    description,
    prices,
    varients,
  });

  res.status(StatusCodes.CREATED).json({ status: "success", pizza });
};

module.exports = {
  getAllPizzas,
  updateAdminInventory,
  createNewPizza,
};
