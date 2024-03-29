import { asyncHandler } from "../Utils/errorHandling.js";
import * as userServices from "../Services/userServices.js";
import {isUser} from "../Services/authServices.js";
import bcrypt from "bcryptjs";
export const updateUser = asyncHandler( async (req, res, next) => {
    const id = req.user._id;
    let data = {...req.body}
    if (req.file) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APP_NAME}/${data.role}/${data.firstName}`
        });
        await cloudinary.uploader.upload.destroy(data.image.public_id);
        data.image = { secure_url, public_id };
    }
    const updatedUser = await userServices.updateUser(id, data);
    if (!updatedUser) {
        return next(new Error('Couldnot update user, please try again',{cause: 400}))
    }
    return res.status(200).json({message: 'user updated successfully', updatedUser})
})
export const changePassword = asyncHandler( async (req, res, next) => {
    const id = req.user._id;
    const issUser = await isUser(req.body.email)
    if (!issUser) {
        return next(new Error('user not found', {cause: 404}))
    }
    const checkPass = bcrypt.compareSync(issUser.password, req.body.newPassword);
    if (checkPass) {
        return next(new Error('Enter a new password', {cause:409}))
    }
    const password = bcrypt.hashSync(req.body.newPassword, parseInt(process.env.SALT_ROUND));
    
    const user = await userServices.changePassword(id, password, Date.now());

    if (!user) {
        return next(new Error('Could not update password',{cause:400}))
    }
})
export const getUserById = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    if (!user) {
        return next(new Error('user not found', {cause: 404}));
    }
    return res.status(200).json({ user });
})
export const getAllDoctors = asyncHandler(async (req, res, next) => {
    const doctors = await userServices.getAllDoctors(req.query);
    if (!doctors) {
        return next(new Error('doctors not found', {cause: 404}));
    }
    return res.status(200).json({message: "success", count: doctors.length, doctors})
})
export const getAllPatients = asyncHandler(async (req, res, next) => {
    const patients = await userServices.getAllPatients(req.query);
    if (!patients) {
        return next(new Error('patients not found', {cause: 404}));
    }
    return res.status(200).json({message: "success", count: patients.length, patients})
})
export const getDoctorsByClinic = asyncHandler(async (req, res, next) => {
    const { clinicId } = req.params;
    const doctors = await userServices.getDoctorsByClinic(clinicId, req.query);
    if (!doctors) {
        return next(new Error('doctors not found', {cause: 404}));
    }
    return res.status(200).json({message: "success", count: doctors.length, doctors})
})
export const getPatientsByClinic = asyncHandler(async (req, res, next) => {
    const { clinicId } = req.params;
    const patients = await userServices.getPatientsByClinic(clinicId, req.query);
    if (!patients) {
        return next(new Error('patients not found', {cause: 404}));
    }
    return res.status(200).json({message: "success", count: patients.length, patients})
})
export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await userServices.getAllUsers(req.query);
    if (!users) {
        return next(new Error('users not found', {cause: 404}));
    }
    return res.status(200).json({message: "success", count: users.length, users})
})
export const getAllUsersByClinic = asyncHandler(async (req, res, next) => {
    const { clinicId } = req.params;
    const users = await userServices.getAllUsersByClinic(clinicId, req.query);
    if (!users) {
        return next(new Error('users not found', {cause: 404}));
    }
    return res.status(200).json({message: "success", count: users.length, users})
})
export const softDeleteUser = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const user = await userServices.softDeleteUser(id);
    if (!user) {
        return next(new Error('user not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'user deleted successfully' , user});
})
export const forceDeleteUser = asyncHandler( async (req, res, next) =>{
    const { id } = req.params;
    const user = await userServices.forceDeleteUser(id);
    if (!user) {
        return next(new Error('user not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'user deleted successfully' , user});
})
