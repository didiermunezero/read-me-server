import * as mongoose from 'mongoose';

export const LessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  author:[
    {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
]
});
