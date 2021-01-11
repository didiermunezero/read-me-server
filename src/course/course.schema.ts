import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});
