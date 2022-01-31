import { Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/user.repository";

export const isAuthorized = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(req.user.uuid);
  const { uuid } = req.params;

  if (uuid !== req.user.uuid && !user?.isAdm) {
    res.status(401).send({ message: "Missing admin permissions" });
  }
  next();
};
