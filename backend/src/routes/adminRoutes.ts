import express from "express";
import { forgetPassword, login } from "../controllers/adminController";

const router = express.Router();

router.post("/login", login as any);
router.put("/forget-password", forgetPassword as any);

export default router;
