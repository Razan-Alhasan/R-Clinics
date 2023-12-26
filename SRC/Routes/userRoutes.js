import { Router } from "express";
const router = Router();
import * as userController from '../Controllers/userController.js';
import {auth} from "../Middleware/auth.js";
import {endPoints} from "../Endpoints/userEndpoints.js";
import {roles} from "../Middleware/roles.js";
router.get('/', auth(endPoints.getAllUsers), userController.getAllUsers)
router.get('/allUsers/:clinicId', auth(endPoints.getAllUsersByClinic), userController.getAllUsersByClinic)
router.get('/user/:id', auth(Object.values(roles)), userController.getUserById)
router.get('/doctors', auth(Object.values(roles)), userController.getAllDoctors)
router.get('/patients', auth(endPoints.getAllPatients), userController.getAllPatients)
router.get('/doctors/:clinicId', auth(Object.values(roles)), userController.getDoctorsByClinic)
router.get('/patients/:clinicId', auth(endPoints.getPatientsByClinic), userController.getPatientsByClinic);
router.patch('/', auth(Object.values(roles)), userController.updateUser)
router.patch('/changePass', auth(Object.values(roles)), userController.changePassword)
router.patch('/softDelete/:id', auth(endPoints.softDeleteUser), userController.softDeleteUser)
router.delete('/forceDelete/:id', auth(endPoints.forceDeleteUser), userController.forceDeleteUser)
export default router;
