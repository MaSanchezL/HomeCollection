import pool from "../db.js";

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT id, total_amount AS "totalAmount", created_at AS "date"
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener pedidos" });
  }
};

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No hay productos en la orden" });
    }

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total_amount) 
       VALUES ($1, $2) RETURNING id, total_amount AS "totalAmount", created_at AS "date"`,
      [userId, totalAmount]
    );
    const order = orderResult.rows[0];

    const orderItemsValues = items.map(
      (item) => `(${order.id}, ${item.productId}, ${item.quantity}, ${item.price})`
    ).join(",");

    await pool.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ${orderItemsValues}`
    );

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la orden" });
  }
};

export default { getMyOrders, createOrder };
