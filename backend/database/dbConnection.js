import mongoose from "mongoose";

export const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URI , {
        dbName:"Hospital"
    }).then(()=>{
        console.log("Connected to the database");
    }).catch(err => {
        console.log("not connected , resolve the errors");
    })
}