import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User,loginOutPut } from './interfaces/user.interface';
import {User_Pass} from './interfaces/user_pass.interface'
import { CreateInput } from './inputs/create.input';
import {loginInput} from './inputs/login.input'
import {ApolloError} from 'apollo-server-express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User_Pass>) {}

  async create(createDto: CreateInput): Promise<User> {
    createDto.password = await bcrypt.hash(createDto.password, 12);
    const exists = await this.userModel.findOne({$or:[
      {username: createDto.username},
      {email: createDto.email}
    ]});
    const createdCat = new this.userModel(createDto);
    return await createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
      const user = await this.userModel.findOne({_id: id});
      if(!user){
          throw new ApolloError("Not found "+id,"NOT_FOUND");
      }
      return user;
  }
  async login(loginDto: loginInput): Promise<loginOutPut>{
      const user = await this.userModel.findOne({username: loginDto.username});
      if(!user){
          throw new ApolloError("Wrong credentials","NOT_FOUND");
      }
      console.log(user)
      const isEqual = await bcrypt.compare(loginDto.password, user.password);
      if(!isEqual){
        throw new ApolloError("Wrong Password","NOT_FOUND");
      }
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          username: user.username,
        },
        "jwtencryptionkey",
        { expiresIn: "2h" }
      );
      return {token: token};
  }
}
