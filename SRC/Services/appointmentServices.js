import appointmentModel from "../../DB/Models/appointmentModel.js";
import { pagination } from "../Utils/pagination.js";
export const getAppointments = async () => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await appointmentModel.find({ isDeleted: false }).skip(skip).limit(limit)
        .populate([{
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
export const getAppointmentsByClinic = async (id) => {
    return await appointmentModel.find({ isDeleted: false, clinicId: id }).populate([{
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
export const getActiveAppointments = async () => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await appointmentModel.find({ isDeleted: false, status: "Active" }).skip(skip).limit(limit)
        .populate([{
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
export const createAppointment = async (data) => {
    return await appointmentModel.create(data);
};
export const getAppointmentById = async (id) => {
    return await appointmentModel.findOne({ _id: id, isDeleted: false }).populate([{
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
export const getAppointmentsByDoctor = async (id) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await appointmentModel.find({ isDeleted: false, doctorId: id }).skip(skip).limit(limit)
        .populate([{
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
export const getAppointmentsByPatient = async (id) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    return await appointmentModel.find({ isDeleted: false, patientId: id }).skip(skip).limit(limit)
        .populate([{
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
export const changeAppointmentStatus = async (id, updatedBy) => {
    return await appointmentModel.findByIdAndUpdate(id, { status: "InActive", updatedBy }, { new: true }).populate([{
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
export const softDeleteAppointment = async (id) => {
    return await appointmentModel.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
};
export const forceDeleteAppointment = async (id) => {
    return await appointmentModel.findOneAndDelete({ _id: id, isDeleted: true });
};
