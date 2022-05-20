const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendMail = async ({ to, subject, html }) => {
  let transporter = nodemailer.createTransport(nodemailerConfig);

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Myah Bosco 👻" <myahbosco@example.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
};

module.exports = sendMail;
