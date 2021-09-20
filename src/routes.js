const { Console } = require("console");
const express = require("express");
const path = require("path");
const log = require("./config/log");
const mail = require("./config/mail");

const routes = express.Router();
routes.use("/", express.static(path.resolve("public")));

routes.post(
  "/api/estimate",
  (req, res, next) => {
    const authHeader = req.headers.access;
    if (!authHeader || authHeader !== "9508b1e85e9f3992c30cc7a8b9d7e1f8") {
      return res.json({
        success: false,
        message: "Requisição não autorizada",
      });
    }
    return next();
  },
  (req, res) => {
    const { name, phone, email, service, message } = req.body;
    if (!name || !phone || !email || !service || !message) {
      return res.json({
        success: false,
        message: "Necessário preencher todos os campos",
      });
    }
    log.info(
      new Date().toISOString() +
        " -> " +
        JSON.stringify({
          name,
          phone,
          email,
          service,
          message,
        })
    );
    mail.options.subject = `${name} está solicitando um orçamento`;
    mail.options.html = templateEmail({
      name,
      phone,
      email,
      service,
      message,
    });
    mail.transporter.close();
    mail.transporter.sendMail(mail.options, (error, info) => {
      if (error) {
        log.info(
          new Date().toISOString() + " error mail -> " + error.toString()
        );
        return res.json({
          success: false,
          message: "Ocorreu um erro ao salvar a solicitação de orçamento",
        });
      }
      return res.json({
        success: true,
        message: "Solicitação de orçamento salva com sucesso",
      });
    });
  }
);

const templateEmail = ({ name, phone, email, service, message }) => `
<div style="background-color: #CCC; padding: 30px; color: #363435">
  <h2>${name} está solicitando um novo orçamento</h2>
  <p style="color: #363435">
    <b>Nome: ${name}<br>Email: ${email}<br>Telefone: ${phone}<br>Serviço: ${service}<br>Mensagem: ${message}</b>
  </p>
</div>
`;

module.exports = routes;
