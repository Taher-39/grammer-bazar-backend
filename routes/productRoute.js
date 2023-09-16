const express = require("express");
const {
  createProduct,
  fetchAllProducts,
} = require("../controllers/productController");
const router = express.Router();

// Define routes for product-related operations
router
  .post("/products", createProduct)
  .get("/products", fetchAllProducts);

module.exports = router;
