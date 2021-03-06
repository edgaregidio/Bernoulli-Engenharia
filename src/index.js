const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");
const fs = require("fs");
require("dotenv/config");

if (!fs.existsSync(path.resolve(__dirname, "logs")))
  fs.mkdirSync(path.resolve(__dirname, "logs"));

const app = express();

app.use(cors());
// app.use(helmet());
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  // res.send(
  //   "Olá, esta aplicação esta rodando em NodeJs versão " + process.version
  // );
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(21115 || 3000, () => {
  console.log("Server Running");
});
