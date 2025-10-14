import pool from "../db.js";
import format from "pg-format";

export const createOrderModel = async () => {};

export const createOrderItemsModel = async () => {};

const getOrders = async (req, res) => {
  try {
    const query = "SELECT * FROM orders WHERE user_id = $1";
    const values = { id };
    const resp = await pool.query(query, values);
    const orders = resp.rows;
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

const existOrders = async (idUser) => {
  const query = "SELECT * from orders where user_id = $1";
  const values = [idUser];
  const response = await pool.query(query, values);
  return response.rows[0];
};
export default { getOrders, existOrders };
