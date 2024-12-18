const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");

router.post("/add-employee", EmployeeController.addEmployee);

module.exports = router;
