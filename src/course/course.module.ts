import { Module } from '@nestjs/common';
import { CourseResolver } from './cats.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './course.schema';
import { CourseService } from './course.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }])],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
