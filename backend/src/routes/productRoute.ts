import express from "express";
import { createProduct, deleteProduct, getAllProduct, getSingleProduct } from "../controllers/productController";
import { middleware } from "../middlewares/middleware"

const router = express.Router();

router.post("/create-Product", middleware as any, createProduct as any);
router.delete("/delete-product/:productId", middleware as any, deleteProduct as any);
router.get("/get-all-product", getAllProduct as any);
router.get("/details-product/:productId", getSingleProduct as any)

export default router;
