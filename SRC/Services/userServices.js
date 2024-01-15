import userModel from '../../DB/Models/userModel.js';
import { pagination } from '../Utils/pagination.js';
export const updateUser = async (id, updatedData) => {
    return await userModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true }).populate(
        {
            path: "clinicId", 
            model: "Clinic", 
            select: "name",
        }).exec();
};
export const changePassword = async (id, password, time) => {
    return await userModel.findByIdAndUpdate(id, { password, changePasswordTime: time }, { new: true });
};
export const getUserById = async (id) => {
    return await userModel.findOne({_id: id, isDeleted: false}).populate(
        {
            path: "clinicId", 
            model: "Clinic", 
            select: "name",
        }).exec();
};
export const getAllDoctors = async () => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await userModel.find({role: "Doctor", isDeleted: false}).skip(skip).limit(limit)        .select('firstName lastName role image').populate(
        {
            path: "clinicId", 
            model: "Clinic", 
            select: "name",
        }).exec();
}
export const getAllPatients = async () => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await userModel.find({role: "Patient", isDeleted: false}).skip(skip).limit(limit)        .select('firstName lastName role image').populate(
        {
            path: "clinicId", 
            model: "Clinic", 
            select: "name",
        }).exec();
}
export const getDoctorsByClinic = async (clinicId) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await userModel.find({role: "Doctor", clinicId, isDeleted: false}).skip(skip).limit(limit)        .select('firstName lastName role image').populate(
        {
            path: "clinicId", 
            model: "Clinic", 
            select: "name",
        }).exec();
}
export const getPatientsByClinic = async (clinicId) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await userModel.find({role: "Patient", clinicId, isDeleted: false}).skip(skip).limit(limit)        .select('firstName lastName role image').populate(
        {
            path: "clinicId", 
            model: "Clinic", 
            select: "name",
        }).exec();
}
export const getAllUsers = async () => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await userModel.find({isDeleted: false}).skip(skip).limit(limit)        .select('firstName lastName role image').populate(
        {
            path: "clinicId", 
            model: "Clinic", 
            select: "name",
        }).exec();
}
export const getAllUsersByClinic = async (clinicId) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await userModel.find({clinicId, isDeleted: false}).skip(skip).limit(limit)        .select('firstName lastName role image').populate(
        {
            path: "clinicId", 
            model: "Clinic", 
            select: "name",
        }).exec();
}
export const softDeleteUser = async (id) => {
    return await userModel.findOneAndUpdate({ _id: id, isDeleted: false }, {isDeleted: true}, {new: true});
}
export const forceDeleteUser = async (id) => {
    return await userModel.findOneAndDelete({ _id: id, isDeleted: true});
}
