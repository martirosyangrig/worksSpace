import { userRepository, workSpaceRepository } from "../../repositories";

export default class WorksSpaceService {
  static async createWorksSpace(name: string, slag: string, ownerId: number) {
    console.log(name, slag, ownerId);
    const owner = await userRepository.findOne({ where: { id: ownerId } });
    if (!owner) throw new Error("User not found for creating worksSpace");

    const worksSpace = workSpaceRepository.create({
      name,
      slag,
      owner: owner,
      users: [owner],
    });

    await workSpaceRepository.save(worksSpace);
    return worksSpace;
  }

  static async getWorkSpaces() {
    const workSpaces = await workSpaceRepository.find({
      relations: {
        users: true,
        owner: true,
        channels: true,
      },
    });

    if (!workSpaces) throw new Error("Couldnt find any workSpaces");

    return workSpaces;
  }

  static async updateWorkSpace(
    name: string,
    slag: string,
    workSpaceId: number
  ) {
    const workSpace = await workSpaceRepository.findOne({
      where: { id: workSpaceId },
    });
    if (!workSpace) throw new Error("Couldnt find workSpace by Id");

    workSpace.name = name;
    workSpace.slag = slag;

    await workSpaceRepository.save(workSpace);

    return workSpace;
  }

  static async delete(workSpaceId: number) {
    const workSpace = await workSpaceRepository.findOne({
      where: { id: workSpaceId },
    });

    if (!workSpace) throw new Error("Couldnt find workSpace by Id");

    await workSpaceRepository.remove(workSpace);

    return { success: true };
  }

  static async joinWorkSpace(userId: number, workSpaceId: number) {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error("Couldnt find user by Id");

    const workSpace = await workSpaceRepository.findOne({
      where: { id: workSpaceId },
      relations: {
        users: true,
      },
    });
    if (!workSpace) throw new Error("Couldnt find workSpace by Id");

    let users = workSpace.users;
    if (!users) users = [];

    users.push(user);
    workSpace.users = users;

    await workSpaceRepository.save(workSpace);

    return workSpace;
  }

  static async leaveWorkSpace(userId: number, workSpaceId: number) {
    const workSpace = await workSpaceRepository.findOne({
      where: { id: workSpaceId },
      relations: {
        users: true,
      },
    });
    if (!workSpace) throw new Error("Couldnt find workSpace by Id");

    let users = workSpace.users;
    if (!users || !users.length)
      throw new Error("This user is not member of workSpace");

    const updatedUsers = users.filter((el) => el.id !== userId);
    workSpace.users = updatedUsers;

    await workSpaceRepository.save(workSpace);

    return workSpace;
  }
}
