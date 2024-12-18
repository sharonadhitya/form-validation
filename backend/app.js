const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", employeeRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Employee Management Backend!");
  });

module.exports = app;
