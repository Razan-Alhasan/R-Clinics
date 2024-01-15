import * as authServices from "../Services/authServices.js";
import jwt from "jsonwebtoken"
import cloudinary from "../Utils/cloudinary.js";
import { sendEmail } from "../Utils/email.js";
import { asyncHandler } from "../Utils/errorHandling.js";
import bcryptjs from "bcryptjs";
import { customAlphabet } from "nanoid";

export const signUp = asyncHandler( async (req, res, next) => {
    const data = { ...req.body }
    const isUser = await authServices.isUser(data.email);
    if (isUser) return next(new Error("email already in use !", { cause : 409}))
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/${data.role}/${data.firstName}`
    })
    data.image = { public_id, secure_url };
    data.password = bcryptjs.hashSync(data.password, parseInt(process.env.SALT_ROUND));
    const user = await authServices.signUp(data);
    if (!user) return next(new Error('Invalid data', {cause:400}));
    const token = jwt.sign({email: data.email}, process.env.CONFIRM_EMAIL_SECRET)
    const html = `<h1> Hello ${data.firstName}</h1> <p> please click <a href='${req.protocol}//${req.headers.host}/auth/confirmEmail/${token}'>CONFIRM YOUR EMAIL</a> to confirm your email<p/>`
    await sendEmail(data.email, "Confirm Email", html)
    return res.status(201).json({ message: "success", user, token });
});
export const confirmEmail = asyncHandler( async (req, res, next) => {
    const { token } = req.params;
    if (!token) return next(new Error("Invalid token", {cause: 400}));
    const decoded = jwt.verify(token, process.env.CONFIRM_EMAIL_SECRET);
    if (!decoded) return next(new Error("Invalid Authentication", {cause: 400}));
    const isConfirmed = await authServices.confirmEmail(decoded);
    if (!isConfirmed)
        return next(new Error("Your email was confirmed || Error While Confirm Email", {cause: 400}));
    return res.status(200).json({ message: "Email confirmed successfully" });
    // return res.redirect(process.env.LOG_IN_FRONTEND);
});
export const signIn = asyncHandler( async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authServices.isUser(email);
    if (!user)
        return next(new Error(`Couldn't find user ${email}` , {cause: 404}));
    if (!user.confirmEmail)
        return next(new Error("please verify your email", { cause: 400 }));
    const match = await bcryptjs.compare(password, user.password);
    if (!match) return next(new Error("Invalid data", {cause: 400}));
    const token = jwt.sign({email, id: user._id, role: user.role, status: user.status}, process.env.LOGIN_SECRET, {expiresIn: "1h"})
    return res.status(200).json({ message: "login successfuly", token });
});
export const sendCode = asyncHandler( async (req, res, next) => {
    const { email } = req.body;
    let user = await authServices.isUser(email);
    if (!user) return next(new Error("Invalid email", {cause: 404}))
    let sendCode = customAlphabet("123456789ABCZabcz", 4)
    sendCode = sendCode()
    const isSend = await authServices.sendCode(email, sendCode)
    if (!isSend) return next(new Error("Invalid send code", {cause: 400}))
    const html = `<h1>Dear ${user.firstName}</h1><h2> Your code is: ${sendCode} please don't share it with anyone </h2> `
    await sendEmail(email, "Reset Password", html)
    return res.status(200).json({ message: "success" });
    // return res.redirect(process.env.RESET_PASS_PAGE)
});
export const resetPassword = asyncHandler( async (req, res, next) => {
    const { email, password, code } = req.body;
    const user = await authServices.checkCode(email, code);
    if (!user) return next(new Error('Invalid data', {cause: 404}));
    const hashedPass = bcryptjs.hashSync(password, parseInt(process.env.SALT_ROUND))
    const isReset = await authServices.resetPassword(email, hashedPass);
    if (!isReset) return next(new Error('error while resetting password', {cause: 400}));
    return res.status(200).json({ message: "success" });
    // return res.redirect(process.env.RESET_PASSWORD_FORM)
});
export const deleteUnConfirmedUser = asyncHandler( async (req, res, next) => {
    const users = await authServices.deleteUnConfirmedUser();
    if(users.deletedCount == 0) return next(new Error('All users are confirmed', {cause: 400}))
    return res.status(200).json({ message: "success" });
});
