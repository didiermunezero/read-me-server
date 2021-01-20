import * as mongoose from 'mongoose';

export const LessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  course:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course'
  },
  author:[
    {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
]
});
