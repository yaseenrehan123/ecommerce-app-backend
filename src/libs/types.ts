import z from "zod";
import createUserSchema from "../schemas/createUserSchema.js";
//INFERS
export type CreateUserRequest = z.infer<typeof createUserSchema>