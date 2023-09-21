const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  cartItems: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  selectAddress: { type: [mongoose.Mixed], required: true },
  selectPaymentMthd: { type: [mongoose.Mixed], required: true },
  totalCost: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toJSON", {
  virtuals: true,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
