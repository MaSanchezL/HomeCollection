import {
  getOrdersByUserId,
  createOrderForUser,
} from "../models/orders.model.js";
import { findUserByEmail } from "../models/auth.model.js";

export const getMyOrders = async (req, res) => {
  try {
    const emailUser = req.user;
    const user = await findUserByEmail(emailUser);

    if (!user) {
      return res.status(403).json({ message: "Debe estar autenticado" });
    }

    const orders = await getOrdersByUserId(user.id);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error en getMyOrders:", error);
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const emailUser = req.user;
    const user = await findUserByEmail(emailUser);

    if (!user) {
      return res.status(403).json({ message: "Debe estar autenticado" });
    }

    const { items, total_amount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "No hay productos para crear la orden" });
    }

    if (!total_amount || total_amount <= 0) {
      return res.status(400).json({ message: "Monto total inválido" });
    }

    const order = await createOrderForUser(user.id, items, total_amount);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error en createOrder:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getItemsByOrderId = async (userId) => {
  try {
    const { rows } = await pool.query(
      `SELECT o.id, o.created_at, o.total_amount
       FROM orders o
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("Error en getOrdersByUserId:", error);
    throw new Error("No se pudieron obtener los pedidos");
  }
};
