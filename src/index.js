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
  res.send(
    "Oloa, esta aplicação esta rodando em NodeJs versão " + process.version
  );
});

app.listen(21093 || 3000, () => {
  console.log("Server Running");
});
