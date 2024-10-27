import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
  detail: {
    type: String,
    required: true,
  },
  typeofPayment: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "Pendiente",
      "En camino",
      "Cancelado",
      "Entregado",
      "En preparación",
    ],
    required: true,
  },
  timeofdeliver: {
    type: Number,
    required: true,
  },
});

// Creación del modelo
const Pedido = mongoose.model("Pedido", PedidoSchema);

export default Pedido;
