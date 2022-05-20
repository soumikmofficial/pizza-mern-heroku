const Token = require("../models/Token");
const { UnauthorizedError, UnauthenticatedError } = require("../errors/errors");
const { isTokenValid } = require("../utils");
const { attachCookiesToResponse } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    //? access token?
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    //? only refreshToken?
    const payload = isTokenValid(refreshToken);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken,
    });
    //? no token or !isValid?
    if (!existingToken || !existingToken.isValid)
      throw new UnauthenticatedError(`authentication failed`);
    //? attach cookies to response and set req.user...next middleware
    attachCookiesToResponse({ res, user: payload.user, refreshToken });
    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError(`authentication failed... try logging in`);
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(`Not authorized to access this route`);
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
