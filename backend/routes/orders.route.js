import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getOrdersByUserId } from "../models/orders.model.js";

const router = Router();

router.get("/me", authMiddleware, ordersController.getMyOrders);
router.get("/:id"), authMiddleware, ordersController,getOrdersByUserId);
router.post("/", authMiddleware, ordersController.createOrder);

export default router;
