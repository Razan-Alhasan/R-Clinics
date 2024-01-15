import joi from 'joi';
import { generalFields } from '../Middleware/validation.js';
export const createClinic = joi.object({
    name: joi.string().min(3).required(),
    phoneNumber: joi.string().min(10).max(10).required(),
    createdBy: generalFields.id,
    updatedBy: generalFields.id
});
export const getClinicById = joi.object({
    id: generalFields.id.required()
});
export const updateClinic = joi.object({
    name: joi.string().min(3).required(),
    phoneNumber: joi.string().min(10).max(10).required(),
    id: generalFields.id.required(),
    updatedBy: generalFields.id
});
export const softDeleteClinic = joi.object({
    id: generalFields.id.required()
});
export const forceDeleteClinic = joi.object({
    id: generalFields.id.required()
});
