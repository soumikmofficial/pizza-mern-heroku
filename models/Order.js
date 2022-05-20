const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    orderItems: {
      type: Array,
      required: true,
      default: [],
    },
    total: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
