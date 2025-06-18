import express from "express";
import { createProduct } from "../controllers/productController";
import { middleware } from "../middlewares/middleware"

const router = express.Router();

router.post("/create-Product", middleware as any, createProduct as any);

export default router;
