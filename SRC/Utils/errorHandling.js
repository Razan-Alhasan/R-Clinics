export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error)=> {
            return next(new Error(error.stack))
        })
    }
};
export const globalErrorHandling = (err, req, res, next) => {
    return res.status(500 || err.cause).json({message : err.message})
};
