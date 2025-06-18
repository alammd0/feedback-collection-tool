import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/db";
import { io } from "../index";

// Zod schema for validation
const productSchema = z.object({
  name: z.string(),
  adminId: z.string(),
});

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = productSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Zod validation failed. Please check input.",
      });
    }

    const { name, adminId } = parsed.data;

    // Check if admin exists
    const existAdmin = await prisma.admin.findFirst({
      where: { id: adminId },
    });

    if (!existAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found with given ID.",
      });
    }

    // Create product
    const newProduct = await prisma.product.create({
      data: { name, adminId },
    });

    // Emit event to all connected clients
    io.emit("newProduct", newProduct);

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating product.",
    });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log("Product ID:", productId);

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID not provided.",
      });
    }

    const existingProduct = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found with given ID.",
      });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    io.emit("productDeleted", deletedProduct);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      data: deletedProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error while deleting product.",
    });
  }
};

// Get All Products

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const allProducts = await prisma.product.findMany();

    if (!allProducts || allProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All products retrieved.",
      data: allProducts,
    });


  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error fetching products.",
    });
  }
};

// Get Single Product
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID not provided.",
      });
    }

    const productDetail = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!productDetail) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product details retrieved.",
      data: productDetail,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching product details.",
    });
  }
};
