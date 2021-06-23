import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import User from '../../models/User';

@Service()
@Resolver(() => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query(() => [User])
  async usersOnline() {
    return this.userRepository.find({ where: { isOnline: true } });
  }

  @Mutation(() => ID)
  async createUser(@Arg('name') name: string) {
    const user = await this.userRepository.save(
      this.userRepository.create({ name }),
    );
    return user.id;
  }
}
