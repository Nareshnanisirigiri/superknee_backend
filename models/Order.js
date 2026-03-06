const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);