import appointmentModel from "../../DB/Models/appointmentModel.js";
export const getAppointments = async () => {
    return await appointmentModel.find({ isDeleted: false });
};
export const getAppointmentsByClinic = async (id) => {
    return await appointmentModel.find({ isDeleted: false, clinicId: id });
};
export const getActiveAppointments = async () => {
    return await appointmentModel.find({ isDeleted: false, status: "Active" });
};
export const createAppointment = async (data) => {
    return await appointmentModel.create(data);
};
export const getAppointmentById = async (id) => {
    return await appointmentModel.find({ _id: id, isDeleted: false });
};
export const getAppointmentsByDoctor = async (id) => {
    return await appointmentModel.find({ isDeleted: false, doctorId: id });
};
export const getAppointmentsByPatient = async (id) => {
    return await appointmentModel.find({ isDeleted: false, patientId: id });
};
export const changeAppointmentStatus = async (id, updatedBy) => {
    return await appointmentModel.findByIdAndUpdate(id, { status: "InActive", updatedBy }, {new: true});
};
export const softDeleteAppointment = async (id) => {
    return await appointmentModel.findOneAndUpdate({ _id: id, isDeleted: false }, {isDeleted: true}, {new: true});
}
export const forceDeleteAppointment = async (id) => {
    return await appointmentModel.findOneAndDelete({ _id: id, isDeleted: true});
}
