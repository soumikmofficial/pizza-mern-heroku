const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  createReview,
  deleteReview,
  getSingleReview,
  getAllExistingReviews,
  updateReview,
} = require("../controllers/reviewController");
const { authenticateUser } = require("../middlewares/authentication");

router.get("/all-existing", getAllExistingReviews);
router.get("/:id", getSingleReview);
router.patch("/:id", authenticateUser, updateReview);
router.get("/get-all/:id", authenticateUser, getAllReviews);
router.delete("/:id", authenticateUser, deleteReview);
router.post("/", authenticateUser, createReview);

module.exports = router;
