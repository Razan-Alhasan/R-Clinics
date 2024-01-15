import joi from 'joi';
import { generalFields } from '../Middleware/validation.js';
export const getBillingByClinic = joi.object({
    id: generalFields.id.required()
})
export const getBillingByPatient = joi.object({
    id: generalFields.id.required()
})
export const getNotPaidBillingByPatient = joi.object({
    id: generalFields.id.required()
})
export const createBill = joi.object({
    amount: joi.number().positive().required(),
    status:joi.string().valid("Paid", "NotPaid"),
    services: joi.string().required(),
    createdBy: generalFields.id,
    updatedBy: generalFields.id,
    patientId: generalFields.id.required(),
    doctorId: generalFields.id.required(),
    clinicId: generalFields.id.required()
});
export const getBillById = joi.object({
    id: generalFields.id.required()
})
export const printPdfBill = joi.object({
    id: generalFields.id.required()
})
export const changeBillStatus = joi.object({
    id: generalFields.id.required(),
    updatedBy: generalFields.id
})
export const softDeleteBill = joi.object({
    id: generalFields.id.required(),
})
export const forceDeleteBill = joi.object({
    id: generalFields.id.required(),
})

