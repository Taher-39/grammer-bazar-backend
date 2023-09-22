const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cartItems: { type: [mongoose.Mixed], required: true },
  totalCost: Number,
  totalItems: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
  selectPaymentMthd: { type: String, required: true },
  selectAddress: { type: mongoose.Mixed, required: true },
  status: { type: String, default: "pending" },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toJSON", {
  virtuals: true,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
