import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getMyOrders, createOrder } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyOrders);
router.post("/", authMiddleware, createOrder);

export default router;