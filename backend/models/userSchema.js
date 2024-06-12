import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength: [3 , "First name must contain atlest 3 characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength: [3 , "Last name must contain atlest 3 characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail , "please provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10 , "phone number must contain 10 number"],
        maxLength:[10 , "phone number must contain 10 number"]
    },
    nic:{
        type:String,
        required:true,
        minLength:[10 , "NIC must contain 10 number"],
        maxLength:[10 , "NIC must contain 10 number"]
    },
    dob:{
        type:Date,
        required:[true , "DOB is required"]
    },
    gender:{
        type:String,
        required:true,
        enum:["Male" , "Female"],
    },
    password:{
        type:String,
        required:true,
        minLength:[8 , "passsword must contain 8 characters"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["Admin" , "Doctor" , "Patient"]
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String
    }
});

userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id} , process.env.JWT_SECRET_KEY , {
        expiresIn:process.env.JWT_EXPIRES
    })
}

export const User = mongoose.model("User" , userSchema);