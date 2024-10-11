import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: Number, required: true },
  items: [
    {
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
