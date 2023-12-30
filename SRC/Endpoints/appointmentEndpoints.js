import {roles} from "../Middleware/roles.js";
export const endPoints = {
    getAppointments: [roles.Admin],
    getActiveAppointments: [roles.Admin, roles.Employee],
    getAppointmentById: [roles.Admin, roles.Employee, roles.Patient, roles.Doctor],
    createAppointment: [roles.Admin, roles.Employee],
    getAppointmentsByClinic: [roles.Admin, roles.Employee],
    changeAppointmentStatus: [roles.Admin, roles.Employee, roles.Patient, roles.Doctor],
    getAppointmentsByDoctor: [roles.Admin, roles.Doctor, roles.Employee],
    getAppointmentsByPatient: [roles.Admin, roles.Patient, roles.Employee],
    softDeleteAppointment: [roles.Admin],
    forceDeleteAppointment: [roles.Admin]
}