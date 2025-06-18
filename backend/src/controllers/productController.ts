
import { Request, Response } from "express";
import { string, z } from "zod";
import { prisma } from "../utils/db";
import { io } from "../index"

const productSchema = z.object({
    name : z.string(),
    adminId : z.string()
})

export const createProduct = async (req : Request, res : Response) => {
    try{
        const parsed = productSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(402).json({
                succuss : false, 
                message : "Zod Validation error or check input"
            })
        }

        const {name, adminId} = parsed.data;

        // check Admin exits or not 
        const existAdmin = await prisma.admin.findFirst({
            where : {
                id : adminId
            }
        })

        if(!existAdmin){
            return res.status(402).json({
                success : false,
                message : "Admin not found given ID..."
            })
        }

        // Now here create Product 
        const newProduct = await prisma.product.create({
            data : {
                name : name,
                adminId : adminId
            }
        })

        // update emit socket for all connected clients 
        io.emit("newProduct", newProduct);

        return res.status(200).json({
            success : true,
            message : "Product create successfully"
        })

    }
    catch(error){
        console.log(error);
        return res.status(302).json({
            success : false, 
            message : "Not create Any Error"
        })
    }
}