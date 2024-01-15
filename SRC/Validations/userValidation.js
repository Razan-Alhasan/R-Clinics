import joi from 'joi';
import { generalFields } from '../Middleware/validation.js';
export const updateUser = joi.object({
    id: generalFields.id,
    firstName: joi.string(),
    lastName: joi.string(),
    address: joi.string(),
    status:joi.string().valid("Active", "InActive"),
    DateOfBirth: joi.date(),
    file: generalFields.file,
    phoneNumber: joi.string().min(10).max(10),
    sendCode: joi.string().min(4).max(4),
    changePasswordTime: joi.date(),
    updatedBy: generalFields.id,
    clinincId: generalFields.id
});
export const getUserById = joi.object({
    id: generalFields.id.required()
})
export const changePassword = joi.object({
    id: generalFields.id.required(),
    email: generalFields.email,
    newPassword: generalFields.password
})
export const getDoctorsByClinic = joi.object({
    clinicId: generalFields.id.required()
})
export const getPatientsByClinic = joi.object({
    clinicId: generalFields.id.required()
})
export const getAllUsersByClinic = joi.object({
    clinicId: generalFields.id.required()
})
export const softDeleteUser = joi.object({
    id: generalFields.id.required(),
})
export const forceDeleteUser = joi.object({
    id: generalFields.id.required(),
})

