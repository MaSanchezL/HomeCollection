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
    console.error("Error al obtener pedidos:", error);
    return res.status(500).json({ error: "Error al obtener pedidos" });
  }
};

const createOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No hay productos en la orden" });
    }

    // Iniciar transacción
    await client.query("BEGIN");

    const totalAmount = items.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    );

    // Crear orden y obtener su ID
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount)
       VALUES ($1, $2)
       RETURNING id, total_amount AS "totalAmount", created_at AS "date"`,
      [userId, totalAmount]
    );

    const orderId = orderResult.rows[0].id;

    // Insertar items de la orden
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await client.query("COMMIT");

    return res.status(201).json(orderResult.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al crear la orden:", error);
    return res.status(500).json({ error: "Error al crear la orden" });
  } finally {
    client.release();
  }
};

export default { getMyOrders, createOrder };
