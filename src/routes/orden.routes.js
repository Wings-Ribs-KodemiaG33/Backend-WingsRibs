import express from "express";
import Order from "../models/orden.model.js";

const router = express.Router();

const generateOrderNumber = async () => {
  const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
  return lastOrder ? lastOrder.orderNumber + 1 : 1; // Incrementa a partir del último número de orden
};

router.post("/orders", async (req, res) => {
  try {
    const { items, client, total, details } = req.body;
    const orderNumber = await generateOrderNumber();

    const order = new Order({
      orderNumber,
      items,
      client,
      total,
      details,
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/orders/:orderNumber", async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/orders/:orderId/items/:itemId", async (req, res) => {
  const { orderId, itemId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    order.items = order.items.filter((item) => item._id.toString() !== itemId);
    await order.save();

    res.status(200).json({ message: "Item eliminado con éxito", order });
  } catch (error) {
    console.error("Error al eliminar el item:", error);
    res.status(500).json({ message: "Error al eliminar el item", error });
  }
});

export default router;
