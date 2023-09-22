const express = require("express");
const {
  createOrder,
  updateOrder,
  fetchOrdersByUser,
} = require("../controllers/orderController");
const router = express.Router();

router
  .post("/", createOrder)
  .get("/", fetchOrdersByUser)
  .patch("/:id", updateOrder);

module.exports = router;
