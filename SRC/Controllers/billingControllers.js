import { asyncHandler } from "../Utils/errorHandling.js";
import * as billingServices from "../Services/billingServices.js";
export const getBilling = asyncHandler(async (req, res, next) => {
    const billing = await billingServices.getBilling();
    if (!billing) {
        return next(new Error('cant find billing', {cause: 404}))
    }
    return res.status(200).json({message:"success", billing})
})
export const getBillingByClinic = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const billing = await billingServices.getBillingByClinic(id);
    if (!billing) {
        return next(new Error('cant find billing', {cause: 404}))
    }
    return res.status(200).json({message:"success", billing})
})
export const getBillById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const bill = await billingService.getBilling(id);
    if (!bill) {
        return next(new Error('cant find bill', {cause: 404}))
    }
    return res.status(200).json({message:"success", bill})
})
export const createBill = asyncHandler(async (req, res, next) => {
    const data = { ...req.body }
    data.createdBy = req.user._id
    const bill = await billingServices.createBill(data);
    if (!bill) {
        return next(new Error('error while creating bill', {cause: 400}))
    }
    return res.status(200).json({message:"success", bill})
});
// export const printPdfBill = asyncHandler(async (req, res, next) => {
    
// });
export const changeBillStatus = asyncHandler(async (req, res, next) => {
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
