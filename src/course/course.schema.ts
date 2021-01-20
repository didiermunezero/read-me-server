import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
  },
  author:[
    {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
],
createdby:{
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'User'
}
},{
  timestamps: true,
});
