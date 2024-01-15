import { Router } from "express";
const router = Router();
import * as authController from "../Controllers/authControllers.js";
import fileUpload, { fileValidation } from "../Utils/multer.js";
import { validation } from "../Middleware/validation.js";
import * as validators from "../Validations/authValidation.js";
router.post('/signUp', fileUpload(fileValidation.image).single("image"), validation(validators.signUp), authController.signUp)
router.patch('/confirmEmail/:token', authController.confirmEmail)
router.post('/signIn', validation(validators.signIn), authController.signIn)
router.patch('/sendCode', validation(validators.sendCode), authController.sendCode)
router.patch('/resetPassword', validation(validators.resetPass), authController.resetPassword)
router.delete('/deleteUnConfirmedUser', authController.deleteUnConfirmedUser)
export default router;