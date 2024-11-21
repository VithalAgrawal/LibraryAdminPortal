const express = require("express");
const router = express.Router();
const { getEmployees } = require("../controllers/employeesController");

router.get("/", getEmployees);

module.exports = router;
