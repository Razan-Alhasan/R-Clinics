import {roles} from "../Middleware/roles.js";
export const endPoints = {
    createPrescription: [roles.Admin, roles.Doctor],
    getPrescriptionById: [roles.Admin, roles.Doctor, roles.Patient],
    getAllPrescription: [roles.Admin],
    getAllPrescriptionByPatient: [roles.Admin, roles.Patient],
    updatePrescription: [roles.Admin, roles.Doctor],
    softDeletePrescription: [roles.Admin],
    forceDeletePrescription: [roles.Admin]
}