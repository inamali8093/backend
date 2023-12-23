import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken' // it is a bearer token that is it works as key
import bcrypt from 'bcrypt' // to hash the password


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true //enable index only on those field which you want to be searchable but it will increase server bill so use it carefully
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, //url
    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    refreshToken: {
        type: String,
    }


},{timestamps: true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next() // isModified check wheather the password is changed or not and the function will run only if the password is changed

    this.password = await bcrypt.hash(this.password, 10)
    next()
}) // here pre is a mongoose hook which run before any event and in this case event is save taht is everytime data will be saved in the db then function will run before the data is saved and it is a middleware so access of next is necessary

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY  
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY  
        }
    )
}

export const User = mongoose.model("User",userSchema)
