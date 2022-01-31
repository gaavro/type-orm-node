import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../repositories/user.repository";
import { createUser, updateUser } from "../services/user.service";

export const signIn = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    const { password: user_password, ...info } = user;

    return res.status(201).send(info);
  } catch (e) {
    if (e instanceof SyntaxError) {
      res.status(400).send({ message: "Missing fields" });
    } else {
      res.status(400).send({ message: "E-mail already registered" });
    }
  }
};

export const listUsers = async (req: Request, res: Response) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.get();

  return res.send(users);
};

export const getUser = async (req: any, res: Response) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(req.user.uuid);

  return res.send(user);
};

export const editUser = async (req: Request, res: Response) => {
  const user = await updateUser(req);
  if (user) {
    const { password: user_password, ...info } = user;
    return res.send(info);
  }
};

export const removeUser = async (req: any, res: Response) => {
  const { uuid } = req.params;
  const userRepository = getCustomRepository(UserRepository);
  await userRepository.delete(uuid);

  return res.send({ message: "User deleted with success" });
};
