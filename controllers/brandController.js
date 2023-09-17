const Brand = require("../models/brandModel");

const brandController = async (req, res) => {
  try {
    const brandController = await Brand.find({}).exec();
    res.status("200").json(brandController);
  } catch (error) {
    res.status("400").json(error);
  }
};

module.exports = {
  brandController,
};
