import { Request, Response } from "express";
import UserService from "../../services/Users";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";
import logger from "jet-logger";

export default class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = await UserService.createUser(name, email, password);

      res.status(HttpStatusCodes.OK).json(user);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await UserService.getAllUsers();

      res.status(HttpStatusCodes.OK).json(allUsers);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ error: "Missing UserId" });
        return;
      }
      const { name, email, password } = req.body;

      const updatedUser = await UserService.updateUser(
        name,
        email,
        password,
        +req.params.id
      );

      res.status(HttpStatusCodes.OK).json(updatedUser);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ error: "Missing UserId" });
        return;
      }

      const result = await UserService.delete(+req.params.id);

      res.status(HttpStatusCodes.OK).json(result);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async uploadImg(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ message: "No file uploaded" });
      }
      const imageName = req.file.filename;
      const userId = req.userId;

      const result = await UserService.uploadImg(imageName, userId);

      res.status(HttpStatusCodes.OK).json(result);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
