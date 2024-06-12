import {Message} from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import errorHandler from "../middleware/errorMiddleware.js"


export const sendMessage = catchAsyncErrors(async(req , res , next) => {
    const {firstName , lastName , email , phone  , message} = req.body;
    if(!firstName || !lastName || !email || !phone  || !message){
        return next(new errorHandler("please fill the full form" , 400));
    }
    await Message.create({firstName , lastName , email , phone  , message});
    res.status(200).json({
        success:true,
        message:"message send successfully"
    });
});

export const getAllMessages = catchAsyncErrors(async(req , res , next) => {
    const messages = await Message.find();
    res.status(200).json({
        success:true,
        messages,
    })
})