const Brand = require("../models/brandModel");

const categoryController = async (req, res) => {
  try {
    const categoryController = await Brand.find({}).exec();
    res.status("200").json(categoryController);
  } catch (error) {
    res.status("400").json(error);
  }
};

module.exports = {
  categoryController,
};
