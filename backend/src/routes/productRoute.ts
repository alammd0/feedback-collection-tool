import express from "express";
import { createProduct, deleteProduct } from "../controllers/productController";
import { middleware } from "../middlewares/middleware"

const router = express.Router();

router.post("/create-Product", middleware as any, createProduct as any);
router.delete("/delete-product/:productId", middleware as any, deleteProduct as any);

export default router;
