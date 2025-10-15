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
  try {
    const userId = req.user.id;
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No hay productos en la orden" });
    }

    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total_amount) 
       VALUES ($1, $2) RETURNING user_id, total_amount`,
      [userId, totalAmount]
    );
    const order = orderResult.rows[0];

    const orderItemsValues = items
      .map(
        (item) =>
          `(${order.id}, ${item.product_id}, ${item.quantity}, ${item.price})`
      )
      .join(",");

    await pool.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price, ${orderItemsValues}`
    );

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la orden" });
  }
};

export default { getMyOrders, createOrder };

/* const getMyOrders = async (req, res) => {
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
  // Conectamos un cliente específico para manejar la transacción
  const client = await pool.connect();

  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No hay productos en la orden" });
    }

    // 1. Iniciar Transacción
    await client.query("BEGIN");

    // 2. Calcular monto total (usando Number() para seguridad)
    const totalAmount = items.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    );

    // 3. Insertar la Orden principal y obtener su ID
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount) 
       VALUES ($1, $2) RETURNING id, total_amount AS "totalAmount", created_at AS "date"`,
      [userId, totalAmount]
    );
    const order = orderResult.rows[0];
    const orderId = order.id;

    // 4. Preparar datos para inserción masiva de ítems (más eficiente que el bucle)
    // Usamos INSERT INTO ... SELECT UNNEST() para una única consulta

    // Convertir los datos de los ítems en arrays planos para UNNEST
    const productIds = items.map((item) => item.product_id);
    const quantities = items.map((item) => item.quantity);
    const prices = items.map((item) => item.price);

    await client.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price) 
       SELECT $1, t.product_id, t.quantity, t.price
       FROM UNNEST($2::int[], $3::int[], $4::numeric[]) AS t(product_id, quantity, price)`,
      [orderId, productIds, quantities, prices]
    );

    // 5. Finalizar Transacción
    await client.query("COMMIT");

    // 6. Respuesta de éxito
    return res.status(201).json(order);
  } catch (error) {
    // Si hay un error, revertir la transacción
    await client.query("ROLLBACK");
    console.error(
      "Error en la creación de la orden (Transacción fallida):",
      error
    );
    return res.status(500).json({ error: "Error al crear la orden" });
  } finally {
    // Liberar el cliente
    client.release();
  }
};

export default { getMyOrders, createOrder }; */
