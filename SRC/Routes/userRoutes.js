import { Router } from "express";
const router = Router();
import * as userController from '../Controllers/userControllers.js';
import {auth} from "../Middleware/auth.js";
import {endPoints} from "../Endpoints/userEndpoints.js";
import { roles } from "../Middleware/roles.js";
import { validation } from "../Middleware/validation.js";
import * as validators from "../Validations/userValidation.js";
router.get('/', auth(endPoints.getAllUsers), userController.getAllUsers)
router.get('/allUsers/:clinicId', auth(endPoints.getAllUsersByClinic), validation(validators.getAllUsersByClinic), userController.getAllUsersByClinic)
router.get('/user/:id', auth(Object.values(roles)), validation(validators.getUserById), userController.getUserById)
router.get('/doctors', auth(Object.values(roles)), userController.getAllDoctors)
router.get('/patients', auth(endPoints.getAllPatients), userController.getAllPatients)
router.get('/doctors/:clinicId', auth(Object.values(roles)), validation(validators.getDoctorsByClinic), userController.getDoctorsByClinic)
router.get('/patients/:clinicId', auth(endPoints.getPatientsByClinic), validation(validators.getPatientsByClinic), userController.getPatientsByClinic);
router.patch('/', auth(Object.values(roles)), validation(validators.updateUser), userController.updateUser)
router.patch('/changePass', auth(Object.values(roles)), validation(validators.changePassword), userController.changePassword)
router.patch('/softDelete/:id', auth(endPoints.softDeleteUser), validation(validators.softDeleteUser), userController.softDeleteUser)
router.delete('/forceDelete/:id', auth(endPoints.forceDeleteUser), validation(validators.forceDeleteUser), userController.forceDeleteUser)
export default router;
