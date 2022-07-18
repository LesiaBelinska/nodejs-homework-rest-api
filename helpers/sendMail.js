const sendgridMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sendgridMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const mail = { ...data, from: "lm.kudak@gmail.com" };
  await sendgridMail.send(mail);
  return true;
};

module.exports = sendMail;
