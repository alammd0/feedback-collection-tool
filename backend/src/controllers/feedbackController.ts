import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/db";

const submitFromSchema = z.object({
  productId: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  review: z.string(),
  rating: z.number(),
});

// submit feedback
export const submitFeedBack = async (req: Request, res: Response) => {
  try {
    const parsed = submitFromSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Zod Error in submit feedback",
      });
    }

    const { productId, name, email, review, rating } = parsed.data;

    const submitFeedbackData = await prisma.feedback.create({
      data: {
        productId: productId,
        name: name,
        email: email,
        feedback: review,
        rating: rating,
      },
    });

    return res.status(200).json({
      success: false,
      message: "Than you submit Feedback..",
      data: submitFeedBack,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "FeedBack Submit error...",
    });
  }
};

// get-all feedback
export const getAllFeedback = async (req : Request, res : Response) => {
    try{

        const allFeedBack = await prisma.feedback.findMany({});

        if(!allFeedBack){
            return res.status(403).json({
                success : false,
                message : "No found feedBack"
            })
        }

        return res.status(200).json({
            success : false,
            message : "All feedback",
            data : allFeedBack
        })

    }
    catch(error){
        console.log(error);
        return res.status(504).json({
            success : false,
            message : "Error fetching feedback details"
        })
    }
}
