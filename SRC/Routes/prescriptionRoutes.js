import { Router } from "express";
const router = Router();
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../Endpoints/prescriptionEndpoints.js";
import * as prescriptionControllers from "../Controllers/prescriptionControllers.js"
import { validation } from "../Middleware/validation.js";
import * as validators from "../Validations/prescriptionValidation.js";
router.post('/', auth(endPoints.createPrescription), validation(validators.createPrescription), prescriptionControllers.createPrescription);
router.get('/:id', auth(endPoints.getPrescriptionById), validation(validators.getPrescriptionById), prescriptionControllers.getPrescriptionById)
router.get('/', auth(endPoints.getAllPrescription), prescriptionControllers.getAllPrescription)
router.get('/prescriptions/:id', auth(endPoints.getAllPrescriptionByPatient), validation(validators.getAllPrescriptionByPatient), prescriptionControllers.getAllPrescriptionByPatient)
router.patch('/:id', auth(endPoints.updatePrescription), validation(validators.updatePrescription), prescriptionControllers.updatePrescription);
router.patch('/softDelete/:id', auth(endPoints.softDeletePrescription), validation(validators.softDeletePrescription), prescriptionControllers.softDeletePrescription);
router.delete('/forceDelete/:id', auth(endPoints.forceDeletePrescription), validation(validators.forceDeletePrescription), prescriptionControllers.forceDeletePrescription);
export default router;
