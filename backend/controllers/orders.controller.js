import { getOrdersByUserId, createOrderForUser } from "../models/orders.model.js";
import { findUserByEmail } from "../models/auth.model.js";

// 🔹 Obtener órdenes del usuario logueado
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

// 🔹 Crear orden del usuario logueado
export const createOrder = async (req, res) => {
  try {
    const emailUser = req.user;
    const user = await findUserByEmail(emailUser);

    if (!user) {
      return res.status(403).json({ message: "Debe estar autenticado" });
    }

    const { items, total_amount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No hay productos para crear la orden" });
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
