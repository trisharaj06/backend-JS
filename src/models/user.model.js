import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  avatar: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
  },
  watchHistory: [{
    type: Schema.Types.ObjectId,
    ref: "Video"
  }],
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  refreshToken: {
    type: String
  },
},{timestamps:true})

export const User = mongoose.model("User",userSchema)