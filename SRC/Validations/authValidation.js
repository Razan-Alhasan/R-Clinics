import joi from 'joi';
import { generalFields } from '../Middleware/validation.js';
export const signUp = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    address: joi.string(),
    status:joi.string().valid("Active", "InActive"),
    role:joi.string().valid("Admin", "Doctor", "Patient", "Employee", "User"),
    DateOfBirth: joi.date().required(),
    file: generalFields.file.required(),
    phoneNumber: joi.string().min(10).max(10).required(),
    email: generalFields.email,
    password: generalFields.password,
    clinincId: generalFields.id,
    doctorDetails: joi.object({
        availability: joi.string().allow(null).default(null),
        speciality: joi.string().allow(null).default(null),
    }).default(null),
    patientDetails: joi.object({
        medicalHistory: joi.string().allow(null).default(null),
    }).default(null),
})
export const signIn = joi.object({
    email: generalFields.email,
    password: generalFields.password,
});
export const sendCode = joi.object({
    email: generalFields.email,
});
export const resetPass = joi.object({
    email: generalFields.email,
    password: generalFields.password,
    changePasswordTime: joi.date(),
    code: joi.number().min(4).max(4).required()
});
