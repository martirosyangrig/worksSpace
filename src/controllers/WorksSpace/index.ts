import { Request, Response } from "express";
import logger from "jet-logger";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";
import WorksSpaceService from "../../services/WorksSpace";

export default class WorksSpaceController {
  static async createWorksSpace(req: Request, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) throw new Error("No CreatorId");

      const { name, slag } = req.body;

      const worksSpace = await WorksSpaceService.createWorksSpace(
        name,
        slag,
        +userId
      );

      res.status(HttpStatusCodes.OK).json(worksSpace);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async getWorkSpaces(req: Request, res: Response) {
    try {
      const workSpaces = await WorksSpaceService.getWorkSpaces();

      res.status(HttpStatusCodes.OK).json(workSpaces);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async updateWorkSpace(req: Request, res: Response) {
    try {
      const workSpaceId = req.params.workSpaceId;
      if (!workSpaceId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const { name, slag } = req.body;

      const updatedWorkSpace = await WorksSpaceService.updateWorkSpace(
        name,
        slag,
        +workSpaceId
      );

      res.status(HttpStatusCodes.OK).json(updatedWorkSpace);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const workSpaceId = req.params.workSpaceId;
      if (!workSpaceId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const result = await WorksSpaceService.delete(+workSpaceId);

      res.status(HttpStatusCodes.OK).json(result);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async joinWorkSpace(req: Request, res: Response) {
    try {
      const workSpaceId = req.params.workSpaceId;
      if (!workSpaceId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const userId = req.userId;

      const result = await WorksSpaceService.joinWorkSpace(
        userId,
        +workSpaceId
      );
      res.status(HttpStatusCodes.OK).json(result);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async leaveWorkSpace(req: Request, res: Response) {
    try {
      const workSpaceId = req.params.workSpaceId;
      if (!workSpaceId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const userId = req.userId;

      const result = await WorksSpaceService.leaveWorkSpace(
        userId,
        +workSpaceId
      );
      res.status(HttpStatusCodes.OK).json(result);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
