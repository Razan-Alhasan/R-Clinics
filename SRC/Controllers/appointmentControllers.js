import * as appointmentServices from "../Services/appointmentServices.js";
import { asyncHandler } from "../Utils/errorHandling.js";
export const getAppointments = asyncHandler( async (req, res, next) => {
    const appointments = await appointmentServices.getAppointments();
    if (!appointments) {
        return next(new Error("No appointments", {cause: 404}))
    }
    return res.status(200).json({message: "success", appointments})
})
export const getAppointmentsByClinic = asyncHandler( async (req, res, next) => {
    const {id} = req.params
    const appointments = await appointmentServices.getAppointments(id);
    if (!appointments) {
        return next(new Error("No appointments", {cause: 404}))
    }
    return res.status(200).json({message: "success", appointments})
})
export const getActiveAppointments = asyncHandler( async (req, res, next) => {
    const appointments = await appointmentServices.getActiveAppointments();
    if (!appointments) {
        return next(new Error("No appointments", {cause: 404}))
    }
    return res.status(200).json({message: "success", appointments})
})
export const createAppointment = asyncHandler(async (req, res, next) => {
    const data = { ...req.body }
    data.createdBy = req.user._id;
    const appointment = await appointmentServices.createAppointment(data);
    if (!appointment) {
        return next(new Error("error while creating appointment", { cause: 400 }))
    }
    return res.status(201).json({message: "success", appointment})
})
export const getAppointmentById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await appointmentServices.getAppointmentById(id)
    if (!appointment) {
        return next(new Error('appointment not found', { cause: 404 }))
    }
    return res.status(200).json({ message: "success", appointment })
})
export const getAppointmentsByDoctor = asyncHandler( async (req, res, next) => {
    const {doctorId} = req.params
    const appointments = await appointmentServices.getAppointmentsByDoctor(doctorId);
    if (!appointments) {
        return next(new Error("No appointments", {cause: 404}))
    }
    return res.status(200).json({message: "success", appointments})
})
export const getAppointmentsByPatient = asyncHandler( async (req, res, next) => {
    const {doctorId} = req.params
    const appointments = await appointmentServices.getAppointmentsByDoctor(doctorId);
    if (!appointments) {
        return next(new Error("No appointments", {cause: 404}))
    }
    return res.status(200).json({message: "success", appointments})
})
export const changeAppointmentStatus = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    updatedBy = req.user._id
    const appointment = await appointmentServices.changeAppointmentStatus(id, updatedBy);
    if (!appointment) {
        return next(new Error('appointment not found', { cause: 404 }));
    }
    return res.status(200).json({ message: "success", appointment });
})
export const softDeleteAppointment = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const appointment = await appointmentServices.softDeleteAppointment(id);
    if (!appointment) {
        return next(new Error('appointment not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'appointment deleted successfully' , appointment});
})
export const forceDeleteAppointment = asyncHandler( async (req, res, next) =>{
    const { id } = req.params;
    const appointment = await appointmentServices.forceDeleteAppointment(id);
    if (!appointment) {
        return next(new Error('appointment not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'appointment deleted successfully' , appointment});
})
