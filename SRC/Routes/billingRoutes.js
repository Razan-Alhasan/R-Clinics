import { Router } from "express";
const router = Router();
import * as billingControllers from "../Controllers/billingControllers.js"
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../Endpoints/billingEndpoints.js";
import { validation } from "../Middleware/validation.js";
import * as validators from "../Validations/billingValidation.js";
router.get('/', auth(endPoints.getBilling), billingControllers.getBilling);
router.get('/billing/:id', auth(endPoints.getBillingByClinic), validation(validators.getBillingByClinic), billingControllers.getBillingByClinic)
router.get('/billing/patient/:id', auth(endPoints.getBillingByPatient), validation(validators.getBillingByPatient), billingControllers.getBillingByPatient)
router.get('/billing/patient/notPaid/:id', auth(endPoints.getNotPaidBillingByPatient), validation(validators.getNotPaidBillingByPatient), billingControllers.getNotPaidBillingByPatient)
router.get('/:id', auth(endPoints.getBillById), validation(validators.getBillById), billingControllers.getBillById)
router.get('/printBill/:id', auth(endPoints.printPdfBill), validation(validators.printPdfBill), billingControllers.printPdfBill);
router.post('/', auth(endPoints.createBill), validation(validators.createBill), billingControllers.createBill)
router.patch('/:id', auth(endPoints.changeBillStatus), validation(validators.changeBillStatus), billingControllers.changeBillStatus)
router.patch('/softDelete/:id', auth(endPoints.softDeleteBill), validation(validators.softDeleteBill), billingControllers.softDeleteBill);
router.delete('/forceDelete/:id', auth(endPoints.forceDeleteBill), validation(validators.forceDeleteBill), billingControllers.forceDeleteBill);
export default router;