import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      success: false,
      errors: errors.array(),
    });
  }
  return next();
};
