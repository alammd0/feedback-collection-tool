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
      success: true,
      message: "Thank you submit Feedback..",
      data: submitFeedbackData,
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
export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const allFeedBack = await prisma.feedback.findMany({});

    if (!allFeedBack) {
      return res.status(403).json({
        success: false,
        message: "No found feedBack",
      });
    }

    return res.status(200).json({
      success: false,
      message: "All feedback",
      data: allFeedBack,
    });

  } catch (error) {
    console.log(error);
    return res.status(504).json({
      success: false,
      message: "Error fetching feedback details",
    });
  }
};

// get avg and rating count means (stats feedback...)
export const getFeedbackStats = async (req: Request, res: Response) => {
  try {
    const stats = await prisma.feedback.groupBy({
      by: ["productId"],
      _avg: {
        rating: true,
      },
      _count: {
        id: true,
      },
      _min: {
        rating: true,
      },
      _max: {
        rating: true,
      },
    });

    if(!stats){
      return res.status(502).json({
        success : false,
        message : "Not stats found"
      })
    }

    const avgRating = stats.map((stat) => ({
      productId: stat.productId,
      averageRating: stat._avg.rating,
      totalfeedbacks: stat._count.id,
      maxFeedback: stat._max.rating,
      minFeedback: stat._min.rating,
    }));

    return res.status(200).json({
      succuss: true,
      message: "Feedback stats fetched",
      data: avgRating,
    });
  } catch (err) {
    console.log(err);
    return res.status(503).json({
      success: false,
      message: "Error while fetching get Feedback stats...",
    });
  }
};

// get papular feedback and sort by avg feedback rating
export const getPapularFeedback = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort === "count" ? "count" : "rating";

    if (!sort) {
      return res.status(502).json({
        success: false,
        message: "No, find any condition for sorting",
      });
    }

    const grouped = await prisma.feedback.groupBy({
      by: ["productId"],
      _avg: {
        rating: true,
      },
      _count: {
        id: true,
      },
      orderBy:
        sort === "rating"
          ? {
              _avg: {
                rating: "desc",
              },
            }
          : {
              _count: {
                id: "desc",
              },
            },
    });

    if(!grouped){
      return res.status(502).json({
        success : false,
        message : "Not grouped"
      })
    }

    const papularFeedback = grouped.map((item) => ({
      productId: item.productId,
      averageRating: item._avg.rating,
      totalfeedbacks: item._count.id
    }));

    return res.status(200).json({
      success : true,
      message : "Popular feedbacks fetched",
      data : papularFeedback
    })


  } catch (err) {
    console.log(err);
    return res.status(503).json({
      success: false,
      message: "Error while fetching get papular feedback...",
    });
  }
};
