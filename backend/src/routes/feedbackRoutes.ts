import express from "express";
import { getAllFeedback, submitFeedBack } from "../controllers/feedbackController"

const router = express.Router();

router.post("/submit-feedback", submitFeedBack as any);
router.get("/get-all-feedback", getAllFeedback as any);

export default router;
