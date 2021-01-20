import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './lesson.schema';
import { LessonService } from './lesson.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }])],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
