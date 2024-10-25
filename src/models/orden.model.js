import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  detalle: String,
  imagen: String,
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  items: [itemSchema],
  details: {
    type: String,
    required: false,
  },
  numberOfOrders: {
    type: Number,
    default: 1,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
