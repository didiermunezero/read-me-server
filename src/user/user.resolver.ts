import { Resolver, Subscription,Query, Mutation, Args, Context,} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express'
import { UserService } from './user.service';
import { UserType,loginOutPut } from './dto/create-user.dto';
import { CreateInput } from './inputs/create.input';
import {loginInput} from './inputs/login.input'
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
    const users =  this.userService.findAll();
    return users;
  }

  @Query(() => UserType)
  async user(@Args('id') id: string) {
    const user =  this.userService.findOne(id);
    return user;
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateInput) {
    pubSub.publish('newUser', { newUser: input });
    return this.userService.create(input);
  }

  @Mutation(()=>loginOutPut)
  async login(@Context('headers')headers:loginOutPut, @Args('logindata') logindata:loginInput){
    console.log(headers)
      return this.userService.login(logindata)
  }
  @Subscription(() => UserType)
  newUser() {
    return pubSub.asyncIterator('newUser');
  }
}
