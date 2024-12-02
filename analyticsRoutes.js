const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const router = express.Router();

// Define analytics endpoints
// router.get("/books-stats", analyticsController.getBooksStats);
// router.get("/transactions-stats", analyticsController.getTransactionsStats);
router.get('/dashboard-data', analyticsController.getDashboardData);

module.exports = router;
