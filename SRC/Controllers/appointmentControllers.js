import * as appointmentServices from "../Services/appointmentServices.js";
import { asyncHandler } from "../Utils/errorHandling.js";
export const getAppointments = asyncHandler( async (req, res, next) => {
    const appointments = await appointmentServices.getAppointments();
    if (appointments.length == 0) {
        return next(new Error("No appointments", {cause: 404}))
    }
    return res.status(200).json({message: "success", count: appointments.length, appointments})
})
export const getAppointmentsByClinic = asyncHandler( async (req, res, next) => {
    const {id} = req.params
    const appointments = await appointmentServices.getAppointments(id);
    if (appointments.length == 0) {
        return next(new Error("No appointments on this clinic", {cause: 404}))
    }
    return res.status(200).json({message: "success", count: appointments.length, appointments})
})
export const getActiveAppointments = asyncHandler( async (req, res, next) => {
    const appointments = await appointmentServices.getActiveAppointments();
    if (appointments.length == 0) {
        return next(new Error("No Active appointments", {cause: 404}))
    }
    return res.status(200).json({message: "success", count: appointments.length, appointments})
})
export const createAppointment = asyncHandler(async (req, res, next) => {
    const data = { ...req.body }
    const time = data.date.split("T")[1];
    const date = data.date.split("T")[0];
    data.date = date
    data.time = time
    data.createdBy = req.user._id;
    if (new Date(date).getTime() < Date.now()) {
        return next(new Error('add a valid day', {cause: 404}))
    }
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
    if (appointments.length == 0) {
        return next(new Error("No appointments", {cause: 404}))
    }
    return res.status(200).json({message: "success", count: appointments.length, appointments})
})
export const getAppointmentsByPatient = asyncHandler( async (req, res, next) => {
    const {patientId} = req.params
    const appointments = await appointmentServices.getAppointmentsByPatient(patientId);
    if (appointments.length == 0) {
        return next(new Error("No appointments", {cause: 404}))
    }
    return res.status(200).json({message: "success", count: appointments.length, appointments})
})
export const changeAppointmentStatus = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let updatedBy = req.user._id
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
