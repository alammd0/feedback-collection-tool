import express from "express";
import {
  getAllFeedback,
  getFeedbackStats,
  getPapularFeedback,
  submitFeedBack,
} from "../controllers/feedbackController";
import { middleware } from "../middlewares/middleware";

const router = express.Router();

router.post("/submit-feedback", submitFeedBack as any);

router.get("/get-all-feedback", middleware as any, getAllFeedback as any);

router.get("/get-feedback-stat", middleware as any, getFeedbackStats as any);

router.get(
  "/get-feedback-papular",
  middleware as any,
  getPapularFeedback as any
);

export default router;
