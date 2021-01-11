import { Resolver, Subscription,Query, Mutation, Args,} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express'
import { CourseService } from './course.service';
import { CatType } from './dto/create-course.dto';
import { CatInput } from './inputs/course.input';
const pubSub = new PubSub();

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CatType])
  async cats() {
    return this.courseService.findAll();
  }

  @Mutation(() => CatType)
  async createCat(@Args('input') input: CatInput) {
    pubSub.publish('newCourse', { newCourse: input });
    return this.courseService.create(input);
  }
  @Subscription(() => CatType)
  newCourse() {
    return pubSub.asyncIterator('newCourse');
  }
}
