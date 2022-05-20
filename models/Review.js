const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      maxLength: [140, "Title too long"],
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Pizza").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: result[0]?.averageRating || 0,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {}
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});
ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
