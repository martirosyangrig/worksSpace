import { User } from "../../entity/user";
import { userRepository } from "../../repositories";
import { getHash } from "../../utils/hash";

export default class UserService {
  static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = await userRepository.findOne({ where: { email } });

    if (user) throw new Error("User with that email already exists");

    const hashedPass = await getHash(password);
    const newUser = userRepository.create({
      name,
      email,
      password: hashedPass,
    });

    await userRepository.save(newUser);

    return newUser;
  }

  static async getAllUsers() {
    const allUsers = await userRepository.find();

    if (!allUsers) throw new Error("No users found");

    return allUsers;
  }

  static async updateUser(
    name: string,
    email: string,
    password: string,
    userId: number
  ) {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) throw new Error("Unable to find User");

    const newHashedPass = await getHash(password);

    user.email = email;
    user.name = name;
    user.password = newHashedPass;

    await userRepository.save(user);

    return user;
  }

  static async delete(userId: number) {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error("Unable to find User");

    await userRepository.remove(user);

    return { success: true };
  }

  static async uploadImg(imageName: string, userId: number) {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error("Unable to find User");

    user.img = imageName;
    await userRepository.save(user);

    return { success: true };
  }
}
