import { Router } from "express";
const router = Router();
import * as billingControllers from "../Controllers/billingControllers.js"
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../Endpoints/billingEndpoints.js";
router.get('/', auth(endPoints.getBilling), billingControllers.getBilling);
router.get('/billing/:id', auth(endPoints.getBillingByClinic), billingControllers.getBillingByClinic)
router.get('/:id', auth(endPoints.getBillById), billingControllers.getBillById)
router.post('/', auth(endPoints.createBill), billingControllers.createBill)
router.patch('/:id', auth(endPoints.changeBillStatus), billingControllers.changeBillStatus)
router.patch('/softDelete/:id', auth(endPoints.softDeleteBill), billingControllers.softDeleteBill);
router.delete('/forceDelete/:id', auth(endPoints.forceDeleteBill), billingControllers.forceDeleteBill);
export default router;