const Category = require("../models/categoryModel");

const getCategoryCntlr = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status("200").json(categories);
  } catch (error) {
    res.status("400").json(error);
  }
};

const postCategoryCntlr = async (req, res) => {
  try {
    const newBrand = new Category(req.body);
    const savedBrand = await newBrand.save();

    res.status(201).json(savedBrand);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the category." });
  }
};

module.exports = {
  getCategoryCntlr,
  postCategoryCntlr,
};
