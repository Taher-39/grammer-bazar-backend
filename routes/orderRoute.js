const express = require("express");
const {
  createOrder,
  fetchAllOrders,
  updateOrder,
} = require("../controllers/orderController");
const router = express.Router();

router
  .post("/", createOrder)
  .get("/", fetchAllOrders)
  .patch("/:id", updateOrder);

module.exports = router;
