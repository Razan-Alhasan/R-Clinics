import { Router } from "express";
const router = Router();
import * as billingControllers from "../Controllers/billingController.js"
router.get('/', billingControllers.getBilling)
router.get('/billing/:id', billingControllers.getBillingByClinic)
router.get('/:id', billingControllers.getBillById)
router.post('/', billingControllers.createBill)
router.patch('/:id', billingControllers.changeBillStatus)
router.patch('/softDelete/:id', billingControllers.softDeleteBill);
router.delete('/forceDelete/:id', billingControllers.forceDeleteBill);
export default router;