import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getMyOrders, createOrder } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, ordersController.getMyOrders);
router.get("/:id"), authMiddleware, ordersController,getOrdersByUserId);
router.post("/", authMiddleware, ordersController.createOrder);

export default router;