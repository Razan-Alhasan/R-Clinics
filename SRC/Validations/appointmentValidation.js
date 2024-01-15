import joi from 'joi';
import { generalFields } from '../Middleware/validation.js';
export const getAppointmentsByClinic = joi.object({
    id: generalFields.id.required(),
    limit: joi.number(),
    page: joi.number()
})
export const createAppointment = joi.object({
    time: joi.date(),
    status:joi.string().valid("Active", "InActive"),
    date: joi.date().greater('now').required(),
    createdBy: generalFields.id,
    updatedBy: generalFields.id,
    patientId: generalFields.id.required(),
    doctorId: generalFields.id.required(),
    clinicId: generalFields.id.required()
});
export const getAppointmentById = joi.object({
    id: generalFields.id.required()
})
export const getAppointmentsByDoctor = joi.object({
    doctorId: generalFields.id.required(),
    limit: joi.number(),
    page: joi.number()
})
export const getAppointmentsByPatient = joi.object({
    patientId: generalFields.id.required(),
    limit: joi.number(),
    page: joi.number()
})
export const changeAppointmentStatus = joi.object({
    id: generalFields.id.required(),
    updatedBy: generalFields.id
})
export const softDeleteAppointment = joi.object({
    id: generalFields.id.required(),
})
export const forceDeleteAppointment = joi.object({
    id: generalFields.id.required(),
})

