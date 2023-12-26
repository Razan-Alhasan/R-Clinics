import { Router } from "express";
const router = Router();
import * as clinicController from "../Controllers/clinicController.js";
import {auth} from "../Middleware/auth.js";
import {endPoints} from "../Endpoints/clinicEndpoints.js";
import {roles} from "../Middleware/roles.js";
router.post('/', auth(endPoints.createClinic), clinicController.createClinic);
router.get('/:id', auth(Object.values(roles)), clinicController.getClinicById);
router.get('/', auth(Object.values(roles)), clinicController.getAllClinics);
router.patch('/:id', auth(endPoints.updateClinic), clinicController.updateClinic);
router.patch('/softDelete/:id', auth(endPoints.softDeleteClinic), clinicController.softDeleteClinic);
router.delete('/forceDelete/:id', auth(endPoints.forceDeleteClinic), clinicController.forceDeleteClinic);
export default router;