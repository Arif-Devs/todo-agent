import type { Request, Response,NextFunction } from "express";
import { ZodType } from "zod";

export const validateParams = (schema: ZodType)=>{
    return (req: Request, res: Response, next: NextFunction)=>{
        const result = schema.safeParse(req.params)

        if(!result.success){
            return res.status(400).json({
                success: false,
                message: "Invalid route parameters",
                error: result.error.flatten()
            })
        }
        next()
    }
}