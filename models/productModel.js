const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: {
    type: Number,
    required: true,
    min: [0, "wrong min discount"],
    max: [90, "wrong max Discount"],
  },
  rating: {
    type: Number,
    required: true,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "min stock wrong"],
    default: 0,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [{ type: String, required: true }],
  deleted: { type: Boolean, default: false },
});

// Define a virtual 'id' property to replace '_id' with 'id'
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting the document to JSON
productSchema.set("toJSON", {
  virtuals: true,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
