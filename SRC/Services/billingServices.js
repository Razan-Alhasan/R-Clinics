import billingModel from "../../DB/Models/billingModel.js";
export const gitBilling = async () => {
    return await billingModel.find({isDeleted: false});
}
export const getBillingByClinic = async (id) => {
    return await billingModel.find({isDeleted: false, clinicId: id});
}
export const gitBillById = async (id) => {
    return await billingModel.find({_id: id, isDeleted: false});
}
export const createBill = async (data) => {
    return await billingModel.create(data);
}
export const changeBillStatus = async (id, updatedBy) => {
    return await billingModel.findByIdAndUpdate(id, {status: "Paid", updatedBy}, {new: true})
};
export const softDeleteBill = async (id) => {
    return await billingModel.findOneAndUpdate({ _id: id, isDeleted: false }, {isDeleted: true}, {new: true});
}
export const forceDeleteBill = async (id) => {
    return await billingModel.findOneAndDelete({ _id: id, isDeleted: true});
}