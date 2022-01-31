import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/user.repositoty";

interface UserBody {
  email?: string;
  password?: string;
  name?: string;
  isAdm?: boolean;
}

export const createUser = async (body: UserBody) => {
  const { email, password, name, isAdm } = body;
  console.log(email, password, name, isAdm);
  if (!email || !name || !password || isAdm === undefined) {
    throw new SyntaxError();
  }

  const userRepository = getCustomRepository(UserRepository);
  const emailAlreadyExists = await userRepository.findOne({ email });
  if (emailAlreadyExists) {
    throw new Error();
  }

  const user = userRepository.create({
    email,
    password,
    name,
    isAdm,
  });

  await userRepository.save(user);

  return user;
};

export const updateUser = async (req: any) => {
  const { uuid } = req.params;
  const data = req.body;
  const userRepository = getCustomRepository(UserRepository);

  await userRepository.update(uuid, data);

  const user = await userRepository.findById(uuid);

  return user;
};
