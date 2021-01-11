import * as mongoose from 'mongoose';

const USER_TYPE = ['LECTURE','ADMIN','NONE']
export const UserSchema = new mongoose.Schema({
  username: {
      type:String,
      required: true,
    },
    fname:{
        type: String,
        required: true,
    },
    lname:{
        type: String,
        required: true,
    },
    dob:{
        type: Date,
    },
    profile:{
        type: String,    
    },
    type: {
        type: String,
        enum: USER_TYPE,
        default:'NONE'
    }
},{
    timestamps: true,
});
