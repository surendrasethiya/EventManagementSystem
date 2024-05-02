const sendErrorDev = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    } else {
        res.status(500).json({
            status: "error",
            message: err
        })
    }
}

const sendErrorProd = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
}

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.message;
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res);
    }
    next();
};

exports.handleErrors = errorHandler;






