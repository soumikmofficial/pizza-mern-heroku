const sendMail = require("./sendMail");

const sendResetPasswordMail = async ({ name, email, passwordResetToken }) => {
  const origin = process.env.ORIGIN;
  const subject = `Reset Password`;
  const link = `${origin}/auth/reset-password?token=${passwordResetToken}&email=${email}`;
  const html = `<h3>Hello, ${name}</h3><p>Please click the following to reset your password</p><a href="${link}">Reset Password</a>`;
  await sendMail({ to: email, subject, html });
};

module.exports = sendResetPasswordMail;
