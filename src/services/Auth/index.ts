import jwt from "jsonwebtoken";
import UserDto from "../../dto/user";
import { compare } from "../../utils/hash";
import { envConfig } from "../../config/env";
import { userRepository } from "../../repositories";

export default class AuthService {
  static async login(email: string, password: string) {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw new Error("Invalid Login or Password");

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid Login or Password");

    const userDto = new UserDto(user.email, user.id, user.name);

    const authToken = jwt.sign(
      { email: userDto.email, id: userDto.id, name: userDto.name },
      envConfig.JWT_SECRET,
      { expiresIn: envConfig.JWT_TIME }
    );

    return { user: userDto, accessToken: authToken };
  }
}
