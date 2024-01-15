import prescriptionModel from "../../DB/Models/prescriptionModel.js";
import { pagination } from "../Utils/pagination.js";
export const createPrescription = async (data) => {
    return await prescriptionModel.create(data)
}
export const getPrescriptionById = async (id) => {
    return await prescriptionModel.findOne({_id: id, isDeleted: false}).populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
    },
    {
        path: "updatedBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "clinicId", 
        model: "Clinic", 
        select: "name",
    },
    {
        path: "createdBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "appointmentId", 
        model: "Appointment", 
    }])
    .exec();
}
export const getAllPrescription = async (data) => {
    const { skip, limit } = pagination(data.page, data.limit);
    return await prescriptionModel.find({isDeleted: false}).skip(skip).limit(limit).populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
    },
    {
        path: "updatedBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "clinicId", 
        model: "Clinic", 
        select: "name",
    },
    {
        path: "createdBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "appointmentId", 
        model: "Appointment", 
    }])
    .exec();
}
export const getAllPrescriptionByPatient = async (id, data) => {
    const { skip, limit } = pagination(data.page, data.limit);
    return await prescriptionModel.find({patientId: id, isDeleted: false}).skip(skip).limit(limit).populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
    },
    {
        path: "updatedBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "clinicId", 
        model: "Clinic", 
        select: "name",
    },
    {
        path: "createdBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "appointmentId", 
        model: "Appointment", 
    }])
    .exec();
};
export const updatePrescription = async (id, updatedData) => {
    return await prescriptionModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true }).populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
    },
    {
        path: "updatedBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "clinicId", 
        model: "Clinic", 
        select: "name",
    },{
        path: "updatedBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "createdBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "appointmentId", 
        model: "Appointment", 
    }])
    .exec();
};
export const softDeletePrescription = async (id) => {
    return await prescriptionModel.findOneAndUpdate({ _id: id, isDeleted: false }, {isDeleted: true}, {new: true});
}
export const forceDeletePrescription = async (id) => {
    return await prescriptionModel.findOneAndDelete({ _id: id, isDeleted: true});
}