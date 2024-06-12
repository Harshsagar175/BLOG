import mongoose, { trusted } from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain atlest 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain atlest 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "phone number must contain 10 number"],
    maxLength: [10, "phone number must contain 10 number"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [10, "NIC must contain 10 number"],
    maxLength: [10, "NIC must contain 10 number"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      reuired: true,
    },
    lastName: {
      type: String,
      reuired: true,
    },
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  hasVisited: {
    type: Boolean,
    default: false
  },
  patientId:{
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum:["Pending" , "Accepted" , "Rejected"],
    default:"Pending"
  }
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
