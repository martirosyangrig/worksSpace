import {
  userRepository,
  workSpaceChannelRepository,
  workSpaceRepository,
} from "../../repositories";

export default class WorkSpaceChannelService {
  static async createChannel(
    workSpaceId: number,
    userId: number,
    name: string
  ) {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error("Couldnt find user by Id");

    const workSpace = await workSpaceRepository.findOne({
      where: { id: workSpaceId },
    });
    if (!workSpace) throw new Error("Couldnt find workspace by Id");

    const newChannel = workSpaceChannelRepository.create({
      name,
      users: [user],
      workspace: workSpace,
      owner: user,
    });
    await workSpaceChannelRepository.save(newChannel);

    return newChannel;
  }

  static async getChannelByWorkSpace(workSpaceId: number) {
    const workSpace = await workSpaceRepository.findOne({
      where: { id: workSpaceId },
    });
    if (!workSpace) throw new Error("Couldnt find workspace by Id");

    const workSpaceChannels = await workSpaceChannelRepository.find({
      where: {
        workspace: {
          id: workSpaceId,
        },
      },
    });
    if (!workSpaceChannels) throw new Error("Couldnt get workSpacechannels");

    return workSpaceChannels;
  }

  static async updateChannel(
    userId: number,
    updatedName: string,
    workSpaceChannelId: number
  ) {
    const workSpaceChannel = await workSpaceChannelRepository.findOne({
      where: {
        id: workSpaceChannelId,
        owner: {
          id: userId,
        },
      },
    });
    if (!workSpaceChannel) throw new Error("Couldnt get workSpacechannels");

    workSpaceChannel.name = updatedName;
    await workSpaceChannelRepository.save(workSpaceChannel);

    return workSpaceChannel;
  }

  static async deleteChannel(userId: number, workSpaceChannelId: number) {
    const workSpaceChannel = await workSpaceChannelRepository.findOne({
      where: {
        id: workSpaceChannelId,
        owner: {
          id: userId,
        },
      },
    });
    if (!workSpaceChannel) throw new Error("Couldnt get workSpacechannels");

    await workSpaceChannelRepository.remove(workSpaceChannel);

    return { success: true };
  }

  static async joinChannel(userId: number, workSpaceChannelId: number) {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error("Couldnt find user by id");

    const channel = await workSpaceChannelRepository.findOne({
      where: { id: workSpaceChannelId },
      relations: { users: true },
    });
    if (!channel) throw new Error("Couldnt find channel by id");

    let users = channel.users;

    if (!users || !users.length) users = [];

    users.push(user);
    channel.users = users;
    await workSpaceChannelRepository.save(channel);

    return channel;
  }

  static async leaveChannel(userId: number, workSpaceChannelId: number) {
    const channel = await workSpaceChannelRepository.findOne({
      where: { id: workSpaceChannelId },
      relations: { users: true },
    });
    if (!channel) throw new Error("Couldnt find channel by id");

    const channelUsers = channel.users;

    const updatedUsers = channelUsers.filter((el) => el.id !== userId);
    channel.users = updatedUsers;

    await workSpaceChannelRepository.save(channel);

    return channel;
  }
}
