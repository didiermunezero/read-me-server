import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { CourseType} from './dto/create-course.dto'
import {CreateInput} from './inputs/create-course.input'
import { Resolver, Subscription,Query, Mutation, Args,} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express'
const pubSub = new PubSub();

@Module({
  providers: [CourseService, CourseResolver]
})
export class CourseModule {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CourseType])
  async users() {
    const users =  this.courseService.findAll();
    return users;
  }

  @Query(() => CourseType)
  async user(@Args('id') id: string) {
    const user =  this.courseService.findOne(id);
    return user;
  }

  @Mutation(() => CourseType)
  async createUser(@Args('input') input: CreateInput) {
    pubSub.publish('newUser', { newUser: input });
    return this.courseService.create(input);
  }

  @Subscription(() => CourseType)
  newUser() {
    return pubSub.asyncIterator('newUser');
  }
}

