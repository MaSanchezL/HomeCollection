import orderModel from "../models/order.model";

const order_create = async (req, res) => {
  try {
    const { orderData } = req.body;
    const newOrder = await createOrderModel();
    res.status(200).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error " });
    console.error("Error=>", error);
  }
};
const orderItems_create = async (req, res) => {
  try {
    const { orderData } = req.body;
    const newOrderItems = await createOrderItemsModel();
    res.status(200).json(newOrderItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error " });
    console.error("Error=>", error);
  }
};
export default {};
