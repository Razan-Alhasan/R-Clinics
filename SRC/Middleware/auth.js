import jwt from "jsonwebtoken";
import userModel from "../../DB/Models/userModel.js";
export const auth = (accessRoles = []) => {
    return async (req, res, next) =>{
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BEARER_KEY)) {
            return next(new Error('Invalid authorization', {cause: 400}))
        }
        const token = authorization.split(process.env.BEARER_KEY)[1];
        const decoded = jwt.verify(token, process.env.LOGIN_SECRET);
        if (!decoded)
            return next(new Error('Invalid authorization', { cause: 400 }));
        if (decoded.exp < (new Date().getTime()/1000)) {
            return next(new Error("token has been expired"), { cause: 400 })
        }
        const user = await userModel.findById(decoded.Id);
        if (!user)
            return next(new Error('Not Registered User', { cause: 400 }));
        if (!accessRoles.includes(user.role))
            return next(new Error("not authorization user", {Cause:403}))
        if (parseInt(user.changePasswordTime?.getTime() / 1000) > decoded.iat)
            return next(new Error('Token expired, plz login again', { cause: 400 }));
        req.user = user;
        next();
    }
}
