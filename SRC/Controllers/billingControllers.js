import { asyncHandler } from "../Utils/errorHandling.js";
import * as billingServices from "../Services/billingServices.js";
import { createPdf } from "../Utils/pdf.js";
import calculateAge from "../Utils/calculateAge.js";
export const getBilling = asyncHandler( async (req, res, next) => {
    const billing = await billingServices.gitBilling();
    if (billing.length == 0) {
        return next(new Error('cant find billing', {cause: 404}))
    }
    return res.status(200).json({message:"success", count: billing.length, billing})
})
export const getBillingByClinic = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const billing = await billingServices.getBillingByClinic(id);
    if (billing.length == 0) {
        return next(new Error('cant find billing', {cause: 404}))
    }
    return res.status(200).json({message:"success", count: billing.length, billing})
})
export const getBillById = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const bill = await billingServices.getBillById(id);
    if (!bill) {
        return next(new Error('cant find bill', {cause: 404}))
    }
    return res.status(200).json({message:"success", bill})
})
export const createBill = asyncHandler( async (req, res, next) => {
    const data = { ...req.body }
    data.createdBy = req.user._id
    const bill = await billingServices.createBill(data);
    if (!bill) {
        return next(new Error('error while creating bill', {cause: 400}))
    }
    return res.status(200).json({message:"success", bill})
});
export const printPdfBill = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const bill = await billingServices.printPdfBill(id)
    bill.patientId.age = calculateAge(bill.patientId.DateOfBirth)
    if (bill.length == 0) {
        return next(new Error('error while fetching and printing bill', {cause: 400}))
    }
    createPdf(bill, 'yourBill.pdf', req, res);
});
export const changeBillStatus = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const updatedBy = req.user._id;
    const bill = await billingServices.changeBillStatus(id, updatedBy);
    if (!bill) {
        return next(new Error('cannot find bill', {cause: 400}))
    }
    return res.status(200).json({message: 'success', bill})
});
export const softDeleteBill = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const bill = await billingServices.softDeleteBill(id);
    if (!bill) {
        return next(new Error('bill not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'bill deleted successfully' , bill});
})
export const forceDeleteBill = asyncHandler( async (req, res, next) =>{
    const { id } = req.params;
    const bill = await billingServices.forceDeleteBill(id);
    if (!bill) {
        return next(new Error('bill not found', { cause: 404 }))
    }
    return res.status(200).json({ message: 'bill deleted successfully' , bill});
})
