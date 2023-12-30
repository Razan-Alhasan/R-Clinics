import {roles} from "../Middleware/roles.js";
export const endPoints = {
    getBilling: [roles.Admin],
    getBillingByClinic: [roles.Admin],
    getBillById: [roles.Admin, roles.Employee],
    createBill: [roles.Admin, roles.Employee],
    printPdfBill: [roles.Admin, roles.Employee],
    changeBillStatus: [roles.Admin, roles.Employee],
    softDeleteBill: [roles.Admin],
    forceDeleteBill: [roles.Admin]
}