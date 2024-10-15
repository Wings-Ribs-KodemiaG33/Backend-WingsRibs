import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  detalle: String, // Campo para detalles del producto
  imagen: String, // Campo para la imagen del producto
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  items: [itemSchema], // Usar el esquema de items
  details: {
    type: String, // Campo adicional para detalles de la orden
    required: false,
  },
  numberOfOrders: {
    type: Number,
    default: 1, // Valor por defecto
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
