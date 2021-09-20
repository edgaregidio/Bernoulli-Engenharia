const winston = require("winston");
const path = require("path");

const log = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.resolve(__dirname, "..", "logs", "logs.txt"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, "..", "logs", "errors.txt"),
      level: "error",
    }),
  ],
});

module.exports = log;
