import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Crear un nuevo pedido
router.post("/", async (req, res) => {
  const { orderNumber, items } = req.body;
  const order = new Order({ orderNumber, items });
  try {
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener un pedido por número
router.get("/:orderNumber", async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
