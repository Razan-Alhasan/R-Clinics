import { Router } from "express";
const router = Router();
import * as appointmentsController from "../Controllers/appointmentControllers.js"
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../Endpoints/appointmentEndpoints.js";
router.get('/', auth(endPoints.getAppointments), appointmentsController.getAppointments)
router.get('/appointments/:id', auth(endPoints.getAppointmentsByClinic), appointmentsController.getAppointmentsByClinic)
router.get('/active', auth(endPoints.getActiveAppointments), appointmentsController.getActiveAppointments)
router.get('/:id', auth(endPoints.getAppointmentById), appointmentsController.getAppointmentById)
router.get('/doctorAppointments/:doctorId', auth(endPoints.getAppointmentsByDoctor), appointmentsController.getAppointmentsByDoctor)
router.get('/patientAppointments/:patientId', auth(endPoints.getAppointmentsByPatient), appointmentsController.getAppointmentsByPatient)
router.post('/', auth(endPoints.createAppointment), appointmentsController.createAppointment)
router.patch('/:id', auth(endPoints.changeAppointmentStatus), appointmentsController.changeAppointmentStatus)
router.patch('/softDelete/:id', auth(endPoints.softDeleteAppointment), appointmentsController.softDeleteAppointment)
router.delete('/forceDelete/:id', auth(endPoints.forceDeleteAppointment), appointmentsController.forceDeleteAppointment)
export default router