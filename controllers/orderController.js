const Order = require("../models/orderModel");

// Create a newOrder
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const fetchOrdersByUser = async (req, res) => {
  try {
    const {user} = req.query;
    const totalOrders = await Order.find({ user: user });
    res.status(200).json(totalOrders);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      upsert: false,
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  fetchOrdersByUser,
};
