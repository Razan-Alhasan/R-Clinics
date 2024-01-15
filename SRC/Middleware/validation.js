import joi from "joi";
export const generalFields = {
    id: joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
    email: joi.string().email().required().min(5).messages({
        "string.empty": "email is required!",
        "string.email": "please enter a valid email",
    }),
    password: joi.string().required().min(3).messages({
        "string.empty": "password is required!",
    }),
    file: joi.object({
        size: joi.number().positive().required(),
        pathL: joi.string().required(),
        filenameL: joi.string().required(),
        destinationL: joi.string().required(),
        mimetypeL: joi.string().required(),
        oncodingL: joi.string().required(),
        originalnameL: joi.string().required(),
        filenameL: joi.string().required(),
        dest: joi.string(),
    })
};
export const validation = (schema) => {
    return (req, res, next) => {
        const inputsData = { ...req.body, ...req.query, ...req.params, ...req.file };
        const validationResult = schema.validate(inputsData, { abortEarly: false });
        if (validationResult.error?.details) {
            return res.status(400).json({ message: "validation error", validationError: validationResult.error.details });
        }
        next();
    };
};