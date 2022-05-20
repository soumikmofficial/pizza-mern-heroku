const jwt = require("jsonwebtoken");

const createJWT = (payload) => jwt.sign(payload, process.env.JWT_SECRET);

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ user });
  const refreshTokenJWT = createJWT({ user, refreshToken });

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExpiry = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + longerExpiry),
  });
};

module.exports = {
  createJWT,
  attachCookiesToResponse,
  isTokenValid,
};
