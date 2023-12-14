import userModel from "../../DB/Models/userModel.js";
export const signUp =  async (data) => {
    return await userModel.create(data);
};
export const confirmEmail = async (data) => {
    return await userModel.findOneAndUpdate({email: data.email, confirmEmail: false}, {confirmEmail: true}, {new: true})
};
export const sendCode = async (email, sendCode) => {
    return await userModel.findOneAndUpdate({ email: email}, {sendCode}, {new: true})
};
export const checkCode = async (email, sendCode) => {
    return await userModel.findOne({email, sendCode}, {new: true})
};
export const resetPassword = async (email, hashedPass) => {
    return await userModel.findOneAndUpdate({ email: email}, {password: hashedPass, sendCode: null, changePasswordTime: Date.now()}, {new: true});
};
export const deleteUnConfirmedUser = async () => {
    return await userModel.deleteMany({ confirmEmail: false });
};
export const isUser = async (email) => {
    return await userModel.findOne({ email });
};
