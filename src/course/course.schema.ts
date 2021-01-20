import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  name: String,
  author:[
    {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
]
},{
  timestamps: true,
});
