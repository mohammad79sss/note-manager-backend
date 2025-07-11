import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || 'something went wrong, try again later';
    return res.status(statusCode).json({ msg });
    next();
};

export default errorHandler;
