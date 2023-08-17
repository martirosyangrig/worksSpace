import { AppDataSource } from "../config/db";
import { User } from "../entity/user";
import { WorksSpaceChannel } from "../entity/worksSpaces-channel";
import { WorksSpaces } from "../entity/workspaces";

export const userRepository = AppDataSource.getRepository(User);
export const workSpaceRepository = AppDataSource.getRepository(WorksSpaces);
export const workSpaceChannelRepository = AppDataSource.getRepository(WorksSpaceChannel);
