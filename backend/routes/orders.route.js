import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getMyOrders,
  createOrder,
  getMyOrderDetail,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyOrders);
router.post("/", authMiddleware, createOrder);
router.get("/:id", authMiddleware, getMyOrderDetail);

export default router;
