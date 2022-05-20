const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["veg", "nonveg"],
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    varients: [],
    prices: [],
  },
  { timestamps: true }
);

PizzaSchema.pre("remove", async function () {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Pizza", PizzaSchema);
