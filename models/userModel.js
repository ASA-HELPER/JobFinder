import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

// User Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password length should be greater than 6 character'],
        select:true,
    },
    location:{
        type:String,
        default:'India'
    }
},{timestamps:true})

// middlewares for password hashing : It will check before storing any data to mongodb using the function provided.
userSchema.pre('save',async function(){
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

// JSON WEBTOKEN
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});
}

// compare password
userSchema.methods.comparePassword = async function(userPassword)
{
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
}

export default mongoose.model('User',userSchema)