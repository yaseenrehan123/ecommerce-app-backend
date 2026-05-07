import express from "express";
import createUserSchema from "../../schemas/createUserSchema.js";
import { CreateUserRequest } from "../../libs/types.js";
import prisma from "../../libs/prisma.js";

const createUserRouter = express.Router();

createUserRouter.post("/", async (req, res) => {
    try {
        const result = createUserSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.error.message
            })
        };
        const data: CreateUserRequest = result.data!
        console.log(data);
        const user = await prisma.user.findUnique({
            where: { clerkId: data.clerkId }
        });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Account Already Exists"
            })
        }
        //console.log("DID NOT FOUND USER!");
        const newUser = await prisma.user.create({
            data: data
        });

        console.log(newUser)
        return res.status(200).json({
            success: true,
            message: "Account has been created!"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: (err as Error).message
        })
    }

});

export default createUserRouter;