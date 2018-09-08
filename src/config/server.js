/**
 * Configure server and global middlewares
 */
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const methodOverride = require("method-override");

const app = express();

app.use(
  // Enable CROSS ORIGIN REQUEST
  cors(),
  // Enable bodyParser from URLEncoded
  bodyParser.urlencoded({ extended: true }),
  // Enable bodyParser from JSON
  bodyParser.json(),
  // Enable methodOverride
  methodOverride()
);

// Configura as rotas da API
require("../controllers")(app);

// Configura as rotas de algum SPA
app.use("/", express.static("./src/public/v1/"));
app.use("*", (req, res) => {
  return res.sendFile("index.html", {
    root: "./src/public/v1/"
  });
});

// Exporta para o arquivo index.js
module.exports = app;
