const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  orders: { type: [mongoose.Mixed] },
  address: { type: [mongoose.Mixed] },
});

authSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
authSchema.set("toJSON", {
  virtuals: true,
});

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
