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
  // filter: {"category": ["smartphone", "laptop"]}
  // pagination: {_page:1, _limit: 10}
  let query = Product.find({});
  let totalProductQuery = Product.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    console.log("query from category", query);
    totalProductQuery = totalProductQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    console.log("query from brand", query);
    totalProductQuery = totalProductQuery.find({
      brand: req.query.brand,
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.find({ [req.query._sort]: req.query._order });
    console.log("query from sort", query);
  }

  const totalDocs = await totalProductQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
    console.log("query from pagination", query);
  }
  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
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
