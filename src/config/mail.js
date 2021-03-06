const nodemailer = require("nodemailer");
require("dotenv/config");

module.exports = {
  transporter: nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_USER}`,
      pass: `${process.env.EMAIL_PASS}`,
    },
  }),
  options: {
    from: `"Novo Orçamento" <${process.env.EMAIL_USER}>`,
    to: "engenharia@bernoulliengenharia.com.br",
  },
};
