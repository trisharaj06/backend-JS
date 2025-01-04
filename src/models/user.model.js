import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
// import { emit } from "nodemon";

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

// avoid using arrow functions here

userSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
  return JsonWebTokenError.sign({
    _id: this._id,
    email: this.email,
    userName: this.userName,
    fullName: this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
  )
}

userSchema.methods.generateRefreshToken = function(){
  return JsonWebTokenError.sign({
    _id: this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
  )
}

export const User = mongoose.model("User",userSchema)