import billingModel from "../../DB/Models/billingModel.js";
import { pagination } from "../Utils/pagination.js";
export const gitBilling = async (data) => {
    const { skip, limit } = pagination(data.page, data.limit);
    return await billingModel.find({isDeleted: false}).skip(skip).limit(limit)
        .populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
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
        path: "updatedBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "doctorId", 
        model: "User", 
        select: "firstName lastName",
    }])
    .exec();
}
export const getBillingByClinic = async (id, data) => {
    const { skip, limit } = pagination(data.page, data.limit);
    return await billingModel.find({isDeleted: false, clinicId: id}).skip(skip).limit(limit)
        .populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
    },
    {
        path: "clinicId", 
        model: "Clinic", 
        select: "name",
    },
    {
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
        path: "doctorId", 
        model: "User", 
        select: "firstName lastName",
    }])
    .exec();
}
export const getBillingByPatient = async (id, data) => {
    const { skip, limit } = pagination(data.page, data.limit);
    return await billingModel.find({isDeleted: false, patientId: id}).skip(skip).limit(limit)
        .populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
    },
    {
        path: "clinicId", 
        model: "Clinic", 
        select: "name",
    },
    {
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
        path: "doctorId", 
        model: "User", 
        select: "firstName lastName",
    }])
    .exec();
}
export const getNotPaidBillingByPatient = async (id, data) => {
    const { skip, limit } = pagination(data.page, data.limit);
    return await billingModel.find({isDeleted: false, patientId: id, status: "NotPaid"}).skip(skip).limit(limit).populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
    },
    {
        path: "clinicId", 
        model: "Clinic", 
        select: "name",
    },
    {
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
        path: "doctorId", 
        model: "User", 
        select: "firstName lastName",
    }])
    .exec();
}
export const getBillById = async (id) => {
    return await billingModel.findOne({_id: id, isDeleted: false}).populate([{
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
        path: "doctorId", 
        model: "User", 
        select: "firstName lastName",
    }])
    .exec();
}
export const printPdfBill = async (id) => {
    return await billingModel.findOne({ _id: id, isDeleted: false, status: "NotPaid" })
    .lean()
    .populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
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
        path: "doctorId", 
        model: "User", 
        select: "firstName lastName",
    }])
    .exec();
}
export const createBill = async (data) => {
    return await billingModel.create(data)
}
export const changeBillStatus = async (id, updatedBy) => {
    return await billingModel.findByIdAndUpdate(id, {status: "Paid", updatedBy}, {new: true}).populate([{
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
        path: "doctorId", 
        model: "User", 
        select: "firstName lastName",
    }])
    .exec();
};
export const softDeleteBill = async (id) => {
    return await billingModel.findOneAndUpdate({ _id: id, isDeleted: false }, {isDeleted: true}, {new: true});
}
export const forceDeleteBill = async (id) => {
    return await billingModel.findOneAndDelete({ _id: id, isDeleted: true});
}