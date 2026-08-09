import type { Request, Response, NextFunction } from "express";

import { AppError } from "../core/errors/app-error.js";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);

  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error!",
  });
};
