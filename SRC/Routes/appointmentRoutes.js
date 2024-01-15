import { Router } from "express";
const router = Router();
import * as appointmentsController from "../Controllers/appointmentControllers.js"
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../Endpoints/appointmentEndpoints.js";
import { validation } from "../Middleware/validation.js";
import * as validators from "../Validations/appointmentValidation.js";
router.get('/', auth(endPoints.getAppointments), appointmentsController.getAppointments)
router.get('/appointments/:id', auth(endPoints.getAppointmentsByClinic), validation(validators.getAppointmentsByClinic), appointmentsController.getAppointmentsByClinic)
router.get('/active', auth(endPoints.getActiveAppointments), appointmentsController.getActiveAppointments)
router.get('/:id', auth(endPoints.getAppointmentById), validation(validators.getAppointmentById), appointmentsController.getAppointmentById)
router.get('/doctorAppointments/:doctorId', auth(endPoints.getAppointmentsByDoctor), validation(validators.getAppointmentsByDoctor), appointmentsController.getAppointmentsByDoctor)
router.get('/patientAppointments/:patientId', auth(endPoints.getAppointmentsByPatient), validation(validators.getAppointmentsByPatient), appointmentsController.getAppointmentsByPatient)
router.post('/', auth(endPoints.createAppointment), validation(validators.createAppointment), appointmentsController.createAppointment)
router.patch('/:id', auth(endPoints.changeAppointmentStatus), validation(validators.changeAppointmentStatus), appointmentsController.changeAppointmentStatus)
router.patch('/softDelete/:id', auth(endPoints.softDeleteAppointment), validation(validators.softDeleteAppointment), appointmentsController.softDeleteAppointment)
router.delete('/forceDelete/:id', auth(endPoints.forceDeleteAppointment), validation(validators.forceDeleteAppointment), appointmentsController.forceDeleteAppointment)
export default router