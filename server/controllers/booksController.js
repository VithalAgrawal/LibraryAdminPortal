const prisma = require("../config/prisma");

exports.getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        transactions: {
          where: { return_date: null },
          include: { employee: true },
        },
      },
    });

    const booksWithBorrowers = books.map((book) => ({
      ...book,
      borrowers: book.transactions.map((transaction) => ({
        name: transaction.employee.name,
        due_date: new Date(
          transaction.disbursement_date.getTime() +
            transaction.loan_duration * 24 * 60 * 60 * 1000
        ),
      })),
    }));

    res.json(booksWithBorrowers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createBook = async (req, res) => {
  const { title, author, isbn, publication_year, available_copies } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        publication_year: parseInt(publication_year),
        available_copies: parseInt(available_copies),
      },
    });
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, publication_year, available_copies } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        isbn,
        publication_year: parseInt(publication_year),
        available_copies: parseInt(available_copies),
      },
    });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
