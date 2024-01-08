import billingModel from "../../DB/Models/billingModel.js";
export const gitBilling = async () => {
    return await billingModel.find({isDeleted: false});
}
export const getBillingByClinic = async (id) => {
    return await billingModel.find({isDeleted: false, clinicId: id});
}
export const getBillById = async (id) => {
    return await billingModel.find({_id: id, isDeleted: false});
}
export const printPdfBill = async (id) => {
    return await billingModel.findOne({ _id: id, isDeleted: false, status: "NotPaid" })
    .lean()
    .populate([{
        path: "patientId", 
        model: "User", 
        select: "firstName lastName DateOfBirth phoneNumber",
    },
    {
        path: "clinicId", 
        model: "Clinic", 
        select: "name",
    },
    {
        path: "createdBy", 
        model: "User", 
        select: "firstName lastName",
    },
    {
        path: "doctorId", 
        model: "User", 
        select: "firstName lastName",
    }])
    .exec();
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