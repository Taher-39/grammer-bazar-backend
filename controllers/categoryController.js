const Category = require("../models/categoryModel");

const getCategoryCntlr = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const postCategoryCntlr = async (req, res) => {
  try {
    const newBrand = new Category(req.body);
    const savedBrand = await newBrand.save();

    res.status(201).json(savedBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCategoryCntlr,
  postCategoryCntlr,
};
