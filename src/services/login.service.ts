import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/user.repositoty";

export const authenticateUser = async (email: string, password: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (user === undefined || !bcrypt.compareSync(password, user.password)) {
    return undefined;
  }

  const token = jwt.sign({ id: user.uuid }, process.env.SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};
