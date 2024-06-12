import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler, { errorMiddleware } from "../middleware/errorMiddleware.js";
import {User} from "../models/userSchema.js"
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const getUserCount = catchAsyncErrors(async (req, res, next) => {
  const count = await User.countDocuments({ role: 'Doctor' });
  res.status(200).json({
    success: true,
    count
  });
});





export const patientRegister = catchAsyncErrors(async(req , res , next) => {
    
    const {firstName , lastName , email , phone , password , gender , dob , nic , role} = req.body;
    console.log(`Request received: ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("please fill full form." , 400));
    }
    
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("user exits!"))
    }
    user = await User.create({firstName , lastName , email , phone , password , gender , dob , nic , role});
    generateToken(user , "user registered" , 200 , res);
});


export const login = catchAsyncErrors(async(req , res , next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    const {email , password , confirmPassword , role } = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please fill all the details" , 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and confirm password donot match") , 400);
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or email" , 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or email" , 400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role is not find" , 400));
    }
    generateToken(user , "logged in successfully" , 200 , res);
});

export const addNewAdmin = catchAsyncErrors(async(req , res , next) => {
    const {firstName , lastName , email , phone , password , gender , dob , nic} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("please fill full form." , 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists` , 400));
    }
    const admin = await User.create({firstName , lastName , email , phone , password , gender , dob , nic , role:"Admin"});
    res.status(200).json({
        success:true ,
        message:"new admin registered."
    })
});


export const getAllDoctors = catchAsyncErrors(async(req , res , next) => {
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    });
});

export const getUserDetails = catchAsyncErrors(async(req , res , next) => {
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    })
});

export const logoutAdmin = catchAsyncErrors(async(req , res , next) => {
    res.status(200).cookie("adminToken" , "" ,{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json(({
        success:true ,
        message:"admin logged out successfully",
    }));

});


export const logoutPatient = catchAsyncErrors(async(req , res , next) => {
    res.status(200).cookie("patientToken" , "" ,{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json(({
        success:true ,
        message:"patient logged out successfully",
    }));

});


export const addNewDoctor = catchAsyncErrors(async(req , res , next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor avatar required" , 400));
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png" , "image/jpeg" , "image/webp" , "image/jpg"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("file format not supported" , 400));
    }
    const {firstName , lastName , email , phone , password , gender , dob , nic , doctorDepartment} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
        return next(new ErrorHandler("please fill all the fields" , 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isregistered.role} exists with this email` , 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("cloudinary error" , cloudinaryResponse.error || "unknown cloudinary error");
    }
    const doctor = await User.create({firstName , lastName , email , phone , password , gender , dob , nic , doctorDepartment , role:"Doctor" , docAvatar:{public_id:cloudinaryResponse.public_id , url:cloudinaryResponse.secure_url},})
    res.status(200).json({
        success:true,
        message:"New doctor registered",
        doctor ,
    });
});

