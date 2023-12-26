import userModel from '../../DB/Models/userModel.js';
export const updateUser = async (id, updatedData) => {
    return await userModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
};
export const changePassword = async (id, password, time) => {
    return await userModel.findByIdAndUpdate(id, { password, changePasswordTime: time }, { new: true });
};
export const getUserById = async (id) => {
    return await userModel.findById(id);
};
export const getAllDoctors = async () => {
    return await userModel.find({role: "Doctor"}).select('firstName lastName role image');
}
export const getAllPatients = async () => {
    return await userModel.find({role: "Patient"}).select('firstName lastName role image');
}
export const getDoctorsByClinic = async (clinicId) => {
    return await userModel.find({role: "Doctor", clinicId}).select('firstName lastName role image');
}
export const getPatientsByClinic = async (clinicId) => {
    return await userModel.find({role: "Patient", clinicId}).select('firstName lastName role image');
}
export const getAllUsers = async () => {
    return await userModel.find().select('firstName lastName role image');
}
export const getAllUsersByClinic = async (clinicId) => {
    return await userModel.find({clinicId}).select('firstName lastName role image');
}
export const softDeleteUser = async (id) => {
    return await userModel.findOneAndUpdate({ _id: id, isDeleted: false }, {isDeleted: true}, {new: true});
}
export const forceDeleteUser = async (id) => {
    return await userModel.findOneAndDelete({ _id: id, isDeleted: true});
}
