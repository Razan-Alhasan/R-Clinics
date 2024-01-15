import joi from 'joi';
import { generalFields } from '../Middleware/validation.js';
export const createPrescription = joi.object({
    instructions: joi.string().required(),
    medications: joi.string().required(),
    date: joi.date().greater("now").required(),
    createdBy: generalFields.id,
    updatedBy: generalFields.id,
    patientId: generalFields.id.required(),
    appointmentId: generalFields.id.required(),
    clinicId: generalFields.id.required()
});
export const getPrescriptionById = joi.object({
    id: generalFields.id
})
export const getAllPrescriptionByPatient = joi.object({
    id: generalFields.id,
    limit: joi.number(),
    page: joi.number()
})
export const updatePrescription = joi.object({
    id: generalFields.id,
    instructions: joi.string(),
    medications: joi.string(),
    date: joi.date(),
    updatedBy: generalFields.id
})
export const softDeletePrescription = joi.object({
    id: generalFields.id,
})
export const forceDeletePrescription = joi.object({
    id: generalFields.id,
})

