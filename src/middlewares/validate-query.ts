import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";


export const validateQuery = (schema: ZodType)=> {
    return(req:Request, res: Response, next: NextFunction) =>{
    const result = schema.safeParse(req.query)

    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "invalid query params",
            errors: result.error.flatten()
        })
    }
    Object.assign(req.query, result.data)
    next()
  }
 }