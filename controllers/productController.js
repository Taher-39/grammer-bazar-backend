const Product = require("../models/productModel");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product." });
  }
};

const fetchAllProducts = async (req, res) => {
  // sort: {_sort: "price", _order: "asc"}
  try {
    const response = await Product.find({});
    res.status(200).json({ products: response });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};

module.exports = {
  createProduct,
  fetchAllProducts,
};
