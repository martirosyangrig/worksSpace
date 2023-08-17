import { Request, Response } from "express";
import logger from "jet-logger";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";
import AuthService from "../../services/Auth";

export default class AuthControler {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, accessToken } = await AuthService.login(email, password);

      res.status(HttpStatusCodes.OK).json({ user, accessToken });
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
