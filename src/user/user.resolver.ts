import { Resolver, Subscription,Query, Mutation, Args, Context,} from '@nestjs/graphql';
import {AuthenticationError, PubSub} from 'apollo-server-express'
import { UserService } from './user.service';
import { UserType,loginOutPut} from './dto/create-user.dto';
import { CreateInput } from './inputs/create.input';
import {updateInput} from './inputs/update.input'
import {loginInput} from './inputs/login.input'
import {headers} from '../../utils/headers.input'
const pubSub = new PubSub();

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(()=>UserType)
  async getCurrentUser(@Context('headers')headers:headers){
    if(!headers.UserToken){
      throw new AuthenticationError("Login required")
    }
    const user  = this.userService.findOne(headers.UserToken.userId)
    return user;
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
  @Mutation(()=>UserType)
  async updateUser(@Context('headers')headers:headers,@Args('update')update: updateInput){
    if(!headers.UserToken || !headers.token){
      throw new AuthenticationError("Login required")
    }
    console.log(headers)
    return this.userService.updateUser(update,headers);
  }
  @Mutation(()=>loginOutPut)
  async login(@Context('headers')headers:loginOutPut, @Args('logindata') logindata:loginInput){
      return this.userService.login(logindata)
  }
  @Subscription(() => UserType)
  newUser() {
    return pubSub.asyncIterator('newUser');
  }
}
