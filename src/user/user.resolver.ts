import { Resolver, Subscription,Query, Mutation, Args,} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express'
import { UserService } from './user.service';
import { UserType } from './dto/create-user.dto';
import { CreateInput } from './inputs/create.input';
const pubSub = new PubSub();

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [UserType])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateInput) {
    pubSub.publish('newUser', { newUser: input });
    return this.userService.create(input);
  }
  @Subscription(() => UserType)
  newUser() {
    return pubSub.asyncIterator('newUser');
  }
}
