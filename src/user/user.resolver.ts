import { Resolver, Subscription,Query, Mutation, Args,} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express'
import { UserService } from './user.service';
import { UserType } from './dto/create-user.dto';
import { CreateInput } from './inputs/create.input';
const pubSub = new PubSub();

@Resolver()
export class UserResolver {
  constructor(private readonly catsService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [UserType])
  async cats() {
    return this.catsService.findAll();
  }

  @Mutation(() => UserType)
  async createCat(@Args('input') input: CreateInput) {
    pubSub.publish('newCat', { newCat: input });
    return this.catsService.create(input);
  }
  @Subscription(() => UserType)
  newCat() {
    return pubSub.asyncIterator('newCat');
  }
}
