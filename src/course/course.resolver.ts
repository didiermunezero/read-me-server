import { Resolver, Subscription,Query, Mutation, Args, Context,} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express'
import { CourseService } from './course.service';
import { CourseType,CreatedCourseOut } from './dto/create-course.dto';
import { CourseInput } from './inputs/course.input';
import {headers} from '../../utils/headers.input'
const pubSub = new PubSub();

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => String)
  async helloCourses() {
    return 'hello do you want courses';
  }

  @Query(() => [CourseType])
  async courses() {
    return this.courseService.findAll();
  }

  @Mutation(() => CreatedCourseOut)
  async createCourse(@Args('input') input: CourseInput,@Context('headers')headers:headers) {
    pubSub.publish('newCourse', { newCourse: input });
    return this.courseService.create(input,headers);
  }
  @Subscription(() => CreatedCourseOut)
  newCourse() {
    return pubSub.asyncIterator('newCourse');
  }
}
