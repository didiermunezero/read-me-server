import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User,loginOutPut } from './interfaces/user.interface';
import {User_Pass} from './interfaces/user_pass.interface'
import { CreateInput } from './inputs/create.input';
import {userValidator,loginValidator,updateUserValidator} from './inputs/joi/create.joi'
import {loginInput} from './inputs/login.input'
import {ApolloError, UserInputError} from 'apollo-server-express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'
import {updateInput} from './inputs/update.input'
import {headers} from '../../utils/headers.input'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User_Pass>) {}

  async create(createDto: CreateInput): Promise<User> {
    const {error} = userValidator(createDto);
    if(error){
      throw new UserInputError(error.details[0].message)
    }
    const exists = await this.userModel.findOne(
      {username: createDto.username}
    );
    if(exists){
      throw new ApolloError("User name taken","TAKEN")
    }
    const emailexists = await this.userModel.findOne(
      {email: createDto.email}
    );
    if(emailexists){
      throw new ApolloError("Email taken","TAKEN")
    }
    createDto.password = await bcrypt.hash(createDto.password, 12);
    const createdCat = new this.userModel(createDto);
    return await createdCat.save();
  }

  async updateUser(userUpdateDto: updateInput,headers: headers): Promise<User>{
    console.log(headers)
    const {error} = updateUserValidator(userUpdateDto);
    if(error){
      throw new UserInputError(error.details[0].message)
    }
    let user = await this.userModel.findOne({_id: headers.UserToken.userId});
    if(!user){
      throw new ApolloError("Error Occurred, Try to login again","NOT_FOUND")
    }
    user = Object.assign(user,userUpdateDto);
    const updated = await user.save();
    return updated;
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
