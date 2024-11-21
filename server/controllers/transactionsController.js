/*const prisma = require("../config/prisma");

exports.getTransactions = async (req, res) => {
  const { status, employee_id } = req.query;

  const whereClause =
    status === "borrowed" && employee_id
      ? { employee_id: parseInt(employee_id), return_date: null }
      : status === "borrowed"
      ? { return_date: null }
      : {};

  try {
    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      include: { book: true, employee: true },
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createTransaction = async (req, res) => {
  const { book_id, employee_id, loan_duration } = req.body;

  if (loan_duration < 7 || loan_duration > 28) {
    return res.status(400).json({ error: "Loan duration must be between 1 week (7 days) and 4 weeks (28 days)." });
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        book_id: parseInt(book_id),
        employee_id: parseInt(employee_id),
        loan_duration: parseInt(loan_duration),
      },
    });
    await prisma.book.update({
      where: { id: parseInt(book_id) },
      data: { available_copies: { decrement: 1 } },
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.returnTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: { return_date: new Date() },
      include: { book: true },
    });
    await prisma.book.update({
      where: { id: transaction.book.id },
      data: { available_copies: { increment: 1 } },
    });
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};*/
const prisma = require("../config/prisma");

exports.getTransactions = async (req, res) => {
  const { status, employee_id } = req.query;

  const whereClause =
    status === "borrowed" && employee_id
      ? { employee_id: parseInt(employee_id), return_date: null }
      : status === "borrowed"
      ? { return_date: null }
      : {};

  try {
    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      include: { book: true, employee: true },
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createTransaction = async (req, res) => {
  const { book_id, employee_id, loan_duration, disbursement_date } = req.body;

  if (loan_duration < 7 || loan_duration > 28) {
    return res.status(400).json({
      error:
        "Loan duration must be between 1 week (7 days) and 4 weeks (28 days).",
    });
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        book_id: parseInt(book_id),
        employee_id: parseInt(employee_id),
        loan_duration: parseInt(loan_duration),
        disbursement_date,
      },
    });
    await prisma.book.update({
      where: { id: parseInt(book_id) },
      data: { available_copies: { decrement: 1 } },
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.returnTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: { return_date: new Date() },
      include: { book: true },
    });
    await prisma.book.update({
      where: { id: transaction.book.id },
      data: { available_copies: { increment: 1 } },
    });
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
