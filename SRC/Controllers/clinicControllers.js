import { asyncHandler } from "../Utils/errorHandling.js";
import * as clinicServices from "../Services/clinicServices.js";
export const createClinic = asyncHandler( async (req, res, next) => {
    const data = { ...req.body };
    data.createdBy = req.user._id;
    if (await clinicServices.checkClinicName(data.name)) {
        return next(new Error(`Clinic ${data.name} is already exists`, {cause: 409}))
    }
    const clinic = await clinicServices.createClinic(data);
    if (!clinic) {
        return next(new Error('error while creating clinic', {cause: 400}))
    }
    return res.status(201).json({message: 'clinic created successfully', clinic})
})
export const getClinicById = asyncHandler( async (req, res, next) =>{
    const { id } = req.params;
    const clinic = await clinicServices.getClinicById(id);
    console.log(clinic)
    if (!clinic) {
        return next(new Error('clinic not found', {cause: 404}))
    }
    return res.status(200).json({message: 'clinic found successfully', clinic})
})
export const getAllClinics = asyncHandler( async (req, res, next) =>{
    const clinics = await clinicServices.getAllClinics(req.query);
    if (!clinics) {
        return next(new Error('clinics not found', { cause: 404 }))
    }
    return res.status(200).json({message: 'clinics found successfully', count: clinics.length, clinics})
})
export const updateClinic = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    if (req.body.name && await clinicServices.checkClinicName(req.body.name)) {
        return next(new Error(`Clinic is already exists`, {cause: 409}))
    }
    updatedData.updatedBy = req.user._id;
    const newClinic = await clinicServices.updateClinic(updatedData, id);
    console.log(newClinic);
    if (!newClinic) {
        return next(new Error('clinic not found', { cause: 404 }))
    }
    return res.status(200).json({message: 'clinic updated successfully', newClinic})
})
export const softDeleteClinic = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const clinic = await clinicServices.softDeleteClinic(id);
    if (!clinic) {
        return next(new Error('clinic not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'clinic deleted successfully' , clinic});
})
export const forceDeleteClinic = asyncHandler( async (req, res, next) =>{
    const { id } = req.params;
    const clinic = await clinicServices.forceDeleteClinic(id);
    if (!clinic) {
        return next(new Error('clinic not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'clinic deleted successfully' , clinic});
})