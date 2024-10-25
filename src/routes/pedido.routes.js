import express from "express";
import Pedido from "../models/pedido.model.js";

const router = express.Router();

router.get("/pedido", async (req, res) => {
  try {
    const items = await Pedido.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error); // Para depuración
    res.status(500).json({ message: "Error al obtener los pedidos" });
  }
});

router.post("/pedido", async (req, res) => {
  const { detail, typeofPayment, time, status, timeofdeliver } = req.body;

  const newItem = new Pedido({
    detail,
    typeofPayment,
    time,
    status,
    timeofdeliver,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/pedido/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const item = await Pedido.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    item.status = status;
    await item.save();

    return res.status(200).json({ message: "Estado actualizado", item });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el estado" });
  }
});

export default router;
