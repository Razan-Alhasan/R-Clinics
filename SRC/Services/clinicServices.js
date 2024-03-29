import clinicModel from "../../DB/Models/clinicModel.js";
import { pagination } from "../Utils/pagination.js";
export const checkClinicName = async (name) => {
    return await clinicModel.findOne({ name });
}
export const createClinic = async (data) => {
    return await clinicModel.create(data)
}
export const getClinicById = async (id) => {
    return await clinicModel.findOne({ _id: id, isDeleted: false }).populate([
        {
            path: "createdBy", 
            model: "User", 
            select: "firstName lastName",
        }, {
            path: "updatedBy", 
            model: "User", 
            select: "firstName lastName",
        }]).exec();
}
export const getAllClinics = async (data) => {
    const { skip, limit } = pagination(data.page, data.limit);
    return await clinicModel.find({ isDeleted: false }).skip(skip).limit(limit).populate([
        {
            path: "createdBy", 
            model: "User", 
            select: "firstName lastName",
        }, {
            path: "updatedBy", 
            model: "User", 
            select: "firstName lastName",
        }]).exec();
}
export const updateClinic = async (updatedData, id) => {
    return await clinicModel.findOneAndUpdate({ _id: id, isDeleted: false }, {$set: updatedData}, {new: true}).populate([
        {
            path: "createdBy", 
            model: "User", 
            select: "firstName lastName",
        }, {
            path: "updatedBy", 
            model: "User", 
            select: "firstName lastName",
        }]).exec();
}
export const softDeleteClinic = async (id) => {
    return await clinicModel.findOneAndUpdate({ _id: id, isDeleted: false }, {isDeleted: true}, {new: true});
}
export const forceDeleteClinic = async (id) => {
    return await clinicModel.findOneAndDelete({ _id: id, isDeleted: true});
}
