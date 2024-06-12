import express from "express";
import { addNewAdmin, patientRegister , getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor } from "../controller/userController.js";
import { login } from "../controller/userController.js";
import { isAdminAuthenticated ,isPatientAuthenticated  } from "../middleware/auth.js";
import { getUserCount } from '../controller/userController.js';

const router = express.Router();


router.get("/count", isAdminAuthenticated, getUserCount); // New route for count
router.post("/patient/register" , patientRegister);
router.post("/login" , login);
router.post("/admin/addnew" , isAdminAuthenticated , addNewAdmin);
router.get("/doctors" , getAllDoctors);
router.get("/admin/me" , isAdminAuthenticated , getUserDetails);
router.get("/admin/logout" , isAdminAuthenticated , logoutAdmin);
router.get("/patient/me" , isPatientAuthenticated , getUserDetails);
router.get("/patient/logout" , isPatientAuthenticated , logoutPatient);
router.post("/doctor/addnew" , isAdminAuthenticated , addNewDoctor);
export default router;

