import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async get(): Promise<User[] | undefined> {
    const users = await this.find({
      order: {
        email: "ASC",
      },
    });

    return users;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findById(uuid: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        uuid,
      },
    });

    return user;
  }
}

export default UserRepository;
