const express = require("express");
const {
  addToCart,
  fetchCartById,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController");
const router = express.Router();

router
  .post("/", addToCart)
  .get("/", fetchCartById)
  .delete("/:id", deleteCartItem)
  .patch("/:id", updateCartItem);

module.exports = router;
