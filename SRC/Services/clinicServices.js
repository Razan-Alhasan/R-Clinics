import clinicModel from "../../DB/Models/clinicModel.js";
export const checkClinicName = async (name) => {
    return await clinicModel.findOne({ name });
}
export const createClinic = async (data) => {
    return await clinicModel.create(data);
}
export const getClinicById = async (id) => {
    return await clinicModel.findOne({ _id: id, isDeleted: false });
}
export const getAllClinics = async () => {
    return await clinicModel.find({ isDeleted: false });
}
export const updateClinic = async (updatedData, id) => {
    return await clinicModel.findOneAndUpdate({ _id: id, isDeleted: false }, {$set: updatedData}, {new: true});
}
export const softDeleteClinic = async (id) => {
    return await clinicModel.findOneAndUpdate({ _id: id, isDeleted: false }, {isDeleted: true}, {new: true});
}
export const forceDeleteClinic = async (id) => {
    return await clinicModel.findOneAndDelete({ _id: id, isDeleted: true});
}
