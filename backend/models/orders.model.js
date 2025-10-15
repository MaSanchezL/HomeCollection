import pool from "../db.js";

// 🔹 Obtener órdenes de un usuario
export const getOrdersByUserId = async (userId) => {
  const { rows } = await pool.query(
    `SELECT o.id, o.created_at, o.total_amount
     FROM orders o
     WHERE o.user_id = $1
     ORDER BY o.created_at DESC`,
    [userId]
  );
  return rows;
};

// 🔹 Crear una nueva orden
export const createOrderForUser = async (userId, items, total) => {
  try {
    /*  await client.query("BEGIN"); */

    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total_amount)
       VALUES ($1, $2)
       RETURNING id, created_at, total_amount`,
      [userId, total]
    );

    const order = orderResult.rows[0];

    for (const item of items) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, item.price]
      );
    }
    return order;
  } catch (error) {
    console.error("Error en la Orden:", error.message);
    throw new Error("No se pudieron obtener los pedidos");
  }
};
