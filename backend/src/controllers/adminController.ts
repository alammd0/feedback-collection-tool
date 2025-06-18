import { Request, Response } from "express";
import { prisma } from "../utils/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Zod schema for login
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const login = async (req: Request, res: Response) => {
  try {
    
    const parsed = userSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        error: parsed.error.flatten(),
      });
    }

    const { email, password } = parsed.data;

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });

    // If admin doesn't exist, auto-register them
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = await prisma.admin.create({
        data: { email, password: hashedPassword },
      });

      const token = jwt.sign({ id: newAdmin.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
        .status(201)
        .json({
          success: true,
          message: "Admin registered and logged in successfully",
          data: newAdmin,
          token,
        });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: existingAdmin.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        data: existingAdmin,
        token,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });

    if (!existingAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { id: existingAdmin.id },
      data: { password: hashedNewPassword },
    });

    return res.status(200).json({
      success: true,
      message: "Password updated. Please log in again.",
    });
  } catch (err) {
    console.error("Forget password error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
