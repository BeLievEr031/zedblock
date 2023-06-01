const { ValidationError } = require("joi");
const CustomeErrorHandler = require("../service/custom-error.js")
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || 'Something went wrong';

    if (err instanceof ValidationError) {
        statusCode = 422;
        errorMessage = err.message;
    }

    if (err instanceof CustomeErrorHandler) {
        statusCode = err.status;
        errorMessage = err.message;
    }

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: errorMessage,
    })
}

module.exports = errorHandler;
