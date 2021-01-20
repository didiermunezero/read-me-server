import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from './interfaces/lesson.interface';
import { LessonInput } from './inputs/lesson.input';
import { ApolloError } from 'apollo-server-express';
import {headers} from '../../utils/headers.input'
import { lessonUpdate } from './inputs/update.input';

@Injectable()
export class LessonService {
  constructor(@InjectModel('Lesson') private readonly lessonModel: Model<Lesson>) {}
  //constructor()

  async create(createCatDto: LessonInput): Promise<Lesson> {
    const createdCat = new this.lessonModel(createCatDto);
    return await createdCat.save();
  }

  async updateLesson(lessonUpdateDto: lessonUpdate,headers: headers): Promise<Lesson>{
    console.log(headers)
    // const {error} = updateUserValidator(lessonUpdateDto);
    // if(error){
    //   throw new UserInputError(error.details[0].message)
    // }
    let user = await this.lessonModel.findOne({_id: headers.UserToken.userId});
    if(!user){
      throw new ApolloError("Error Occurred, Try to login again","NOT_FOUND")
    }
    const sameUser = await this.lessonModel.findOne({
      _id: {
        $ne: lessonUpdateDto._id,
      },
      $or: [
        {
          title: lessonUpdateDto.title,
        },
      ],
    });
    if (sameUser) {
     throw new ApolloError("Lesson title taken","ALREADY_EXISTS");
    }
    user = Object.assign(user,lessonUpdateDto);
    const updated = await user.save();
    return updated;
  }
  async findAll(): Promise<Lesson[]> {
    return await this.lessonModel.find().populate('author').populate('course').exec();
  }
  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findOne({_id: id});
    if(!lesson){
        throw new ApolloError("Not found "+id,"NOT_FOUND");
    }
    return lesson;
}
}
