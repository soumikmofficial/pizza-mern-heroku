const sendMail = require("./sendMail");

const sendVerificationMail = async ({ name, email, verificationToken }) => {
  const origin = process.env.ORIGIN;
  const subject = `Verification Email`;
  const link = `${origin}/auth/verify-email?token=${verificationToken}&email=${email}`;
  const html = `<h3>Hello, ${name}</h3><p>Please click the following to verify your account</p><a href="${link}">Verify Email</a>`;
  await sendMail({ to: email, subject, html });
};

module.exports = sendVerificationMail;
