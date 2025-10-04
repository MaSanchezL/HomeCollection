import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, ordersController.getMyOrders);
router.post("/", authMiddleware, ordersController.createOrder);

export default router;
