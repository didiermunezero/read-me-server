import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './interfaces/course.interface';
import { CourseInput } from './inputs/course.input';

@Injectable()
export class CourseService {
  constructor(@InjectModel('Course') private readonly catModel: Model<Course>) {}

  async create(createCatDto: CourseInput): Promise<Course> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Course[]> {
    return await this.catModel.find().exec();
  }
}
