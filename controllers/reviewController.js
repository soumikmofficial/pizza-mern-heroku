const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");
const Pizza = require("../models/Pizza");
const { BadRequestError, UnauthorizedError } = require("../errors/errors");

// todo: get all existing reviews
const getAllExistingReviews = async (req, res) => {
  const reviews = await Review.find();
  res
    .status(StatusCodes.OK)
    .json({ status: "success", count: reviews.length, reviews });
};

// todo: get all reviews by product id
const getAllReviews = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ product: id })
    .populate({
      path: "user",
      select: "name",
    })
    .sort({ createdAt: -1 });

  const currentUserReview = await Review.findOne({
    product: id,
    user: req.user.userId,
  });

  res.status(200).json({
    status: "success",
    count: reviews.length,
    reviews,
    currentUserReview,
  });
};

// todo: get single review by review id
const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });
  if (!review) throw new BadRequestError(`Review doesn't exist`);
  res.status(StatusCodes.OK).json({ status: "success", review });
};

// todo: create a review
const createReview = async (req, res) => {
  const { rating, comment, product, title } = req.body;

  const { userId } = req.user;

  if (!rating || !comment || !product || !title || !userId) {
    throw new BadRequestError(
      `Couldn't post review due to one or more missing fields`
    );
  }

  const productExists = await Pizza.findOne({ _id: product });

  if (!productExists) throw new BadRequestError(`product does not exist`);

  const review = await Review.create({
    rating,
    comment,
    product,
    user: userId,
    title,
  });

  res.status(StatusCodes.CREATED).json({ status: "success", review });
};

// todo: delete review by id
const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id, user: req.user.userId });
  if (!review) throw new BadRequestError(`review doesn't exist`);

  const deleted = await review.remove();

  res.status(StatusCodes.OK).json({ status: "success", deleted });
};

// todo: update review
const updateReview = async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  const { title, rating, comment } = req.body;

  const review = await Review.findOne({ _id: id });
  if (!review) throw new BadRequestError(`Review doesn't exist`);
  if (!title || !rating || !comment) {
    throw new BadRequestError(`One or more fields are missing`);
  }
  if (review.user.toString() !== req.user.userId) {
    console.log(review.user.toString(), "..........", req.user.userId);
    throw new UnauthorizedError(`Not authorized to update this review`);
  }
  (review.title = title), (review.rating = rating), (review.comment = comment);
  await review.save();
  res.status(StatusCodes.OK).json({ status: "success", review });
};

module.exports = {
  getAllReviews,
  createReview,
  deleteReview,
  getSingleReview,
  updateReview,
  getAllExistingReviews,
};
