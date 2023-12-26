import {roles} from "../Middleware/roles.js";
export const endPoints = {
    createClinic: [roles.Admin],
    updateClinic: [roles.Admin],
    softDeleteClinic: [roles.Admin],
    forceDeleteClinic: [roles.Admin]
}