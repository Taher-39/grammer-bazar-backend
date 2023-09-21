const Cart = require("../models/cartModel");

const fetchCartById = async (req, res) => {
  try {
    const { user } = req.query;
    const cartItems = await Cart.find({ user: user }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addToCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    const result = await savedCart.populate("product");

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await Cart.findByIdAndDelete(id);
    res.status(200).json(deleteItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  fetchCartById,
  deleteCartItem,
  updateCartItem,
};
