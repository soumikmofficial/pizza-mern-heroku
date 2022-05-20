const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `Something went wrong. Please try again`,
  };
  return res
    .status(customError.statusCode)
    .json({ status: "failed", message: customError.msg });
};

module.exports = errorHandlerMiddleware;
