import { Router } from "express";
const router = Router();
import * as appointmentsController from "../Controllers/appointmentControllers.js"

router.get('/', appointmentsController.getAppointments)
router.get('/appointments/:id', appointmentsController.getAppointmentsByClinic)
router.get('/active', appointmentsController.getActiveAppointments)
router.get('/:id', appointmentsController.getAppointmentById)
router.get('/doctorAppointments/:doctorId', appointmentsController.getAppointmentsByDoctor)
router.get('/patientAppointments/:patientId', appointmentsController.getAppointmentsByPatient)
router.post('/', appointmentsController.createAppointment)
router.patch('/:id', appointmentsController.changeAppointmentStatus)
router.patch('/softDelete/:id', appointmentsController.softDeleteAppointment)
router.delete('/forceDelete/:id', appointmentsController.forceDeleteAppointment)
export default router