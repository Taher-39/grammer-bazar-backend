const Brand = require("../models/brandModel");

const getAllBrandsCntlr = async (req, res) => {
  try {
    const brands = await Brand.find({}).exec();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postBrandsCntlr = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBrandsCntlr,
  postBrandsCntlr,
};
