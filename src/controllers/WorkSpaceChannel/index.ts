import { Request, Response } from "express";
import logger from "jet-logger";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";
import WorkSpaceChannelService from "../../services/WorkSpaceChannel";

export default class WorkSpaceChannelController {
  static async createChannel(req: Request, res: Response) {
    try {
      const workSpaceId = req.params.workspaceId;
      if (!workSpaceId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const userId = req.userId;
      const { name } = req.body;

      const workSpaceChannel = await WorkSpaceChannelService.createChannel(
        +workSpaceId,
        userId,
        name
      );

      res.status(HttpStatusCodes.OK).json(workSpaceChannel);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async getChannelByWorkSpace(req: Request, res: Response) {
    try {
      const workSpaceId = req.params.workspaceId;
      if (!workSpaceId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const workSpaceChannels =
        await WorkSpaceChannelService.getChannelByWorkSpace(+workSpaceId);

      res.status(HttpStatusCodes.OK).json(workSpaceChannels);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async updateChannel(req: Request, res: Response) {
    try {
      const workSpaceChannelId = req.params.workspaceChannelId;
      if (!workSpaceChannelId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const userId = req.userId;
      const { name } = req.body;

      const updatedWorkSpaceChannel =
        await WorkSpaceChannelService.updateChannel(
          userId,
          name,
          +workSpaceChannelId
        );

      res.status(HttpStatusCodes.OK).json(updatedWorkSpaceChannel);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async deleteChannel(req: Request, res: Response) {
    try {
      const workSpaceChannelId = req.params.workspaceChannelId;
      if (!workSpaceChannelId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const userId = req.userId;

      const result = await WorkSpaceChannelService.deleteChannel(
        userId,
        +workSpaceChannelId
      );

      res.status(HttpStatusCodes.OK).json(result);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async joinChannel(req: Request, res: Response) {
    try {
      const workSpaceChannelId = req.params.workspaceChannelId;
      if (!workSpaceChannelId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const userId = req.userId;

      const updatedChannel = await WorkSpaceChannelService.joinChannel(
        userId,
        +workSpaceChannelId
      );

      res.status(HttpStatusCodes.OK).json(updatedChannel);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  static async leaveChannel(req: Request, res: Response) {
    try {
      const workSpaceChannelId = req.params.workspaceChannelId;
      if (!workSpaceChannelId)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send("Cant get workSpaceId");

      const userId = req.userId;

      const updatedChannel = await WorkSpaceChannelService.leaveChannel(
        userId,
        +workSpaceChannelId
      );

      res.status(HttpStatusCodes.OK).json(updatedChannel);
    } catch (error: any) {
      logger.err(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
