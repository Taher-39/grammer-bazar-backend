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
    let query = Product.find({ deleted: { $ne: true } });
    let totalProductQuery = Product.find({ deleted: { $ne: true } });

    if (req.query.category) {
      const category = req.query.category;
      query = query.where("category").equals(category);
      totalProductQuery = totalProductQuery.where("category").equals(category);
    }

    if (req.query.brand) {
      const brand = req.query.brand;
      query = query.where("brand").equals(brand);
      totalProductQuery = totalProductQuery.where("brand").equals(brand);
    }

    // TODO: how to get sort discounted price not actual price
    if (req.query._sort && req.query._order) {
      const sortField = req.query._sort;
      const sortOrder = req.query._order === "desc" ? -1 : 1;
      query = query.sort({ [sortField]: sortOrder });
    }

    const totalDocs = await totalProductQuery.countDocuments();

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const docs = await query.exec();

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
