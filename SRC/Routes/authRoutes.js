import { Router } from "express";
const router = Router();
import * as authController from "../Controllers/authController.js";
import fileUpload, { fileValidation } from "../Utils/multer.js";
router.post('/signUp', fileUpload(fileValidation.image).single("image"), authController.signUp)
router.patch('/confirmEmail/:token', authController.confirmEmail)
router.post('/signIn', authController.signIn)
router.patch('/sendCode', authController.sendCode)
router.patch('/resetPassword', authController.resetPassword)
router.delete('/deleteUnConfirmedUser', authController.deleteUnConfirmedUser)
export default router;