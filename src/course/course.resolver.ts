import { Resolver, Subscription,Query, Mutation, Args,} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express'
import { CourseService } from './course.service';
import { CourseType } from './dto/create-course.dto';
import { CourseInput } from './inputs/course.input';
const pubSub = new PubSub();

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CourseType])
  async courses() {
    return this.courseService.findAll();
  }

  @Mutation(() => CourseType)
  async createCourse(@Args('input') input: CourseInput) {
    pubSub.publish('newCourse', { newCourse: input });
    return this.courseService.create(input);
  }
  @Subscription(() => CourseType)
  newCourse() {
    return pubSub.asyncIterator('newCourse');
  }
}
