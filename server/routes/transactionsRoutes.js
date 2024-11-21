const express = require("express");
const router = express.Router();
const {
  getTransactions,
  createTransaction,
  returnTransaction,
} = require("../controllers/transactionsController");

router.get("/", getTransactions);
router.post("/", createTransaction);
router.put("/:id/return", returnTransaction);

module.exports = router;
