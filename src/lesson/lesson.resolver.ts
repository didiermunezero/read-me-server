import { Resolver, Subscription,Query, Mutation, Args,} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express'
import { LessonService } from './lesson.service';
import { LessonType } from './dto/create-lesson.dto';
import { LessonInput } from './inputs/lesson.input';
const pubSub = new PubSub();

@Resolver()
export class CourseResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [LessonType])
  async courses() {
    return this.lessonService.findAll();
  }

  @Mutation(() => LessonType)
  async createCourse(@Args('input') input: LessonInput) {
    pubSub.publish('newLesson', { newLesson: input });
    return this.lessonService.create(input);
  }
  @Subscription(() => LessonType)
  newCourse() {
    return pubSub.asyncIterator('newLesson');
  }
}
