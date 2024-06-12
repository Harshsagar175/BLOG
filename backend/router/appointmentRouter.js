// import express from 'express';
// import {deleteAppointment, getAllAppointments, postAppointment , updateAppointmentStatus} from '../controller/appointmentController.js';
// import { isAdminAuthenticated ,isPatientAuthenticated  } from "../middleware/auth.js";

// const router = express.Router();

// router.post("/post" ,isPatientAuthenticated , postAppointment);
// router.get("/getall" ,isAdminAuthenticated , getAllAppointments);
// router.put("/update/:id" ,isAdminAuthenticated , updateAppointmentStatus);
// router.delete("/delete/:id" , isAdminAuthenticated , deleteAppointment);

// export default router;

import express from 'express';
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus, getAppointmentCount } from '../controller/appointmentController.js';
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.get("/count", isAdminAuthenticated, getAppointmentCount); // New route for count
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
