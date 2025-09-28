import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import productController from "../controllers/product.controller.js";

const productRoute = Router();

productRoute.post("/create", productController.product_create);

productRoute.get("/all", productController.product_all);

productRoute.get("/:id", productController.product_by_id);

export default productRoute;
