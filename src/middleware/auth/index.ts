import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { AuthorizedRequest } from "../../interfaces/global.interfaces";
import { envConfig } from "../../config/env";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";

export const verifyUser = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const accessToken = req.header("Authorization")?.split(" ")[1];
      if (!accessToken) throw new Error("AccessToken not found");
  
      const decoded = jwt.verify(accessToken, envConfig.JWT_SECRET) as Record<string, any>;
      if (!decoded) throw new Error("Can't decode token");
  
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
    }
  };
  