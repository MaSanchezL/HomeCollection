import pool from "../db.js";

export const getOrdersByUserId = async (userId) => {
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

export const getItemsByOrderId = async (orderId) => {
  try {
    const { rows } = await pool.query(
      `SELECT o.order_id, o.id, o.product_id, o.quantity, o.price, p.image_url, p.nombre AS product_name
       FROM order_items o
       JOIN products p ON o.product_id = p.id
       WHERE o.order_id = $1
       ORDER BY o.id ASC`,
      [orderId]
    );
    return rows;
  } catch (error) {
    console.error("Error en getItemsByOrderId:", error);
    throw new Error("No se pudo obtener el detalle");
  }
};

export const createOrderForUser = async (userId, items, total) => {
  try {
    console.log("Creando orden para userId:", userId);
    console.log("Total:", total);
    console.log("Items:", items);

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
    console.error("Error en createOrderForUser:", error);
    throw new Error("Error al crear la orden");
  }
};
