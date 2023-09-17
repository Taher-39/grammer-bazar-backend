const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

brandSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
brandSchema.set("toJSON", {
  virtuals: true,
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
