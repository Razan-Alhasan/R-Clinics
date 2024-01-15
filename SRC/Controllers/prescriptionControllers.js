import { asyncHandler } from "../Utils/errorHandling.js";
import * as prescriptionServices from "../Services/prescriptionServices.js";
export const createPrescription = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };
    data.createdBy = req.user._id;
    const prescription = await prescriptionServices.createPrescription(data);
    if (!prescription) {
        return next(new Error("error while creating prescription", {cause: 400}))
    }
    return res.status(201).json({message: "created successfully", prescription})
})
export const getPrescriptionById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const prescription = await prescriptionServices.getPrescriptionById(id);
    if (!prescription) {
        return next(new Error("prescription not found", { cause: 404 }));
    }
    return res.status(201).json({ message: "success", prescription });
})
export const getAllPrescription = asyncHandler(async (req, res, next) => {
    const prescriptions = await prescriptionServices.getAllPrescription();
    if (prescriptions.length == 0) {
        return next(new Error("prescriptions not found", { cause: 404 }));
    }
    return res.status(201).json({ message: "success", count: prescriptions.length, prescriptions });
})
export const getAllPrescriptionByPatient = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const prescriptions = await prescriptionServices.getAllPrescription(id);
    if (prescriptions.length == 0) {
        return next(new Error("prescriptions not found", { cause: 404 }));
    }
    return res.status(201).json({ message: "success", count: prescriptions.length, prescriptions });
})
export const updatePrescription = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = { ...req.body };
    data.updatedBy = req.user._id;
    const prescription = await prescriptionServices.updatePrescription(id, data);
    if (!prescription) {
        return next(new Error("prescriptions not found", { cause: 404 }));
    }
    return res.status(201).json({ message: "success", prescription });
})
export const softDeletePrescription = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const prescription = await prescriptionServices.softDeletePrescription(id);
    if (!prescription) {
        return next(new Error('prescription not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'prescription deleted successfully' , prescription});
})
export const forceDeletePrescription = asyncHandler( async (req, res, next) =>{
    const { id } = req.params;
    const prescription = await prescriptionServices.forceDeletePrescription(id);
    if (!prescription) {
        return next(new Error('prescription not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'prescription deleted successfully' , prescription});
});
