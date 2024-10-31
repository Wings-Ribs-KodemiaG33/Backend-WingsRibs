import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item: String,
  photo: String,
  price: Number,
  discount: Number,
  description: String,
  qty: {
    type: Number,
    required: true,
  },
});

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: undefined,
    minLength: 5,
    maxLenght: 150,
  },
  address: {
    type: String,
    required: undefined,
    minLength: 5,
    maxLenght: 150,
  },
  cpnum: {
    type: Number,
    required: undefined,
    Length: 5,
  },
  phone: {
    type: Number,
    required: undefined,
    Length: 10,
  },
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
    required: false,
  },
  total: {
    type: Number,
    required: true,
  },
  client: clientSchema,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
