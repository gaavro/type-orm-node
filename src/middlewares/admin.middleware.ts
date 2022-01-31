import { Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/user.repositoty";

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(req.user.uuid);
  if (!user?.isAdm) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};
