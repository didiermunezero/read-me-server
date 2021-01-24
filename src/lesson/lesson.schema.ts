import * as mongoose from 'mongoose';

export const LessonSchema = new mongoose.Schema({
  title: {type :String,
  required: true},
  content: {type :String,
    required: true},
  createdby:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"User"
  },
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
},{
  timestamps: true
});
