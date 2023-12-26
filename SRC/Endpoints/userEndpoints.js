import {roles} from "../Middleware/roles.js";
export const endPoints = {
    getAllPatients: [roles.Admin],
    getPatientsByClinic: [roles.Admin],
    getAllUsers: [roles.Admin],
    getAllUsersByClinic: [roles.Admin],
    softDeleteUser: [roles.Admin],
    forceDeleteUser: [roles.Admin],
}