import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from './interfaces/lesson.interface';
import { LessonInput } from './inputs/lesson.input';

@Injectable()
export class LessonService {
  constructor(@InjectModel('Lesson') private readonly lessonModel: Model<Lesson>) {}

  async create(createCatDto: LessonInput): Promise<Lesson> {
    const createdCat = new this.lessonModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Lesson[]> {
    return await this.lessonModel.find().populate('author').exec();
  }
}
