import { findUserByEmail } from "../models/auth.model.js";
import {
  getOrdersByUserId,
  createOrderForUser,
} from "../models/orders.model.js";

const ordersController = {};

// 🔹 GET /api/orders/me
ordersController.getMyOrders = async (req, res) => {
  try {
    const emailUser = req.user; // viene del token (middleware)
    const user = await findUserByEmail(emailUser);

    if (!user) {
      return res
        .status(403)
        .json({ error: "Debe estar autenticado para ver sus órdenes" });
    }

    const orders = await getOrdersByUserId(user.id);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({
      error: "Error al obtener órdenes del usuario",
      desc: error.message,
    });
  }
};

// 🔹 POST /api/orders
ordersController.createOrder = async (req, res) => {
  try {
    const emailUser = req.user;
    const user = await findUserByEmail(emailUser);

    if (!user) {
      return res
        .status(403)
        .json({ error: "Debe estar autenticado para crear una orden" });
    }

    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ error: "Debe incluir productos en la orden" });
    }

    const newOrder = await createOrderForUser(user.id, items, total);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear orden:", error);
    res.status(500).json({
      error: "Error al crear orden",
      desc: error.message,
    });
  }
};

export default ordersController;
