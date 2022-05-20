const express = require("express");
const {
  getAllPizzas,
  updateAdminInventory,
  createNewPizza,
} = require("../controllers/pizzaController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const router = express.Router();

router.route("/").get(authenticateUser, getAllPizzas);
router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createNewPizza);
router
  .route("/update-admin-inventory")
  .patch(authenticateUser, authorizePermissions("admin"), updateAdminInventory);

module.exports = router;
