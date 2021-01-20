import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './interfaces/course.interface';
import { CourseInput } from './inputs/course.input';

@Injectable()
export class CourseService {
  constructor(@InjectModel('Course') private readonly courseModel: Model<Course>) {}

  async create(createCatDto: CourseInput): Promise<Course> {
    const createdCat = new this.courseModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find().populate('author').exec();
  }
}
