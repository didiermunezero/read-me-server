import { Resolver, Subscription,Query, Mutation, Args, Context,} from '@nestjs/graphql';
import {AuthenticationError, PubSub} from 'apollo-server-express'
import { LessonService } from './lesson.service';
import { LessonType } from './dto/create-lesson.dto';
import { LessonInput } from './inputs/lesson.input';
import {headers} from '../../utils/headers.input'
import { lessonUpdate } from './inputs/update.input';
const pubSub = new PubSub();

@Resolver()
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(() => String)
  async helloLessons() {
    return 'hello you are altering lessons';
  }

  @Query(() => [LessonType])
  async lessons() {
    return this.lessonService.findAll();
  }


  @Query(() => LessonType)
  async lesson(@Args('id') id: string) {
    const lesson =  this.lessonService.findOne(id);
    return lesson;
  }
  @Mutation(()=>LessonType)
  async updateLesson(@Context('headers')headers:headers,@Args('update')update: lessonUpdate){
    if(!headers.UserToken || !headers.token){
      throw new AuthenticationError("Login required")
    }
    console.log(headers)
    return this.lessonService.updateLesson(update,headers);
  }
  @Mutation(() => LessonType)
  async createLesson(@Args('input') input: LessonInput) {
    pubSub.publish('newLesson', { newLesson: input });
    return this.lessonService.create(input);
  }
  @Subscription(() => LessonType)
  newLesson() {
    return pubSub.asyncIterator('newLesson');
  }
}
