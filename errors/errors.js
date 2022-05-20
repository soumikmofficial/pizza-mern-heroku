const { StatusCodes } = require("http-status-codes");
const CustomError = require("./cutomApiError");

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  UnauthenticatedError,
};
