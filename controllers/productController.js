const Product = require("../models/productModel");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    // Create the base query
    let query = Product.find({});
    let totalProductQuery = Product.find({});

    // Apply category filter
    if (req.query.category) {
      const category = req.query.category;
      query = query.where("category").equals(category);
      totalProductQuery = totalProductQuery.where("category").equals(category);
    }

    // Apply brand filter
    if (req.query.brand) {
      const brand = req.query.brand;
      query = query.where("brand").equals(brand);
      totalProductQuery = totalProductQuery.where("brand").equals(brand);
    }

    // Apply sorting
    // TODO: how to get sort discounted price not actual price
    if (req.query._sort && req.query._order) {
      const sortField = req.query._sort;
      const sortOrder = req.query._order === "desc" ? -1 : 1;
      query = query.sort({ [sortField]: sortOrder });
    }

    // Count total documents before pagination
    const totalDocs = await totalProductQuery.countDocuments();

    // Apply pagination
    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    // Execute the query
    const docs = await query.exec();

    // Set response headers
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      upsert: false,
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
};
