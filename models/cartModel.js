const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  quantity: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

cartSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
cartSchema.set("toJSON", {
  virtuals: true,
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
