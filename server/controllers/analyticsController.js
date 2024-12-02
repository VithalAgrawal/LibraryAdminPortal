const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { subMonths, subQuarters, subYears } = require("date-fns");

exports.getDashboardData = async (req, res) => {
  try {
    const now = new Date();

    // Books added stats
    const booksAddedStats = {
      Month: await prisma.book.count({
        where: {
          createdAt: {
            gte: subMonths(now, 1),
          },
        },
      }),

      Quarter: await prisma.book.count({
        where: {
          createdAt: {
            gte: subQuarters(now, 1),
          },
        },
      }),
      SixMonths: await prisma.book.count({
        where: {
          createdAt: {
            gte: subMonths(now, 6),
          },
        },
      }),
      Year: await prisma.book.count({
        where: {
          createdAt: {
            gte: subYears(now, 1),
          },
        },
      }),
    };

    // Transactions stats
    const transactionsStats = {
      Month: await prisma.transaction.count({
        where: {
          disbursement_date: {
            gte: subMonths(now, 1),
          },
        },
      }),
      Quarter: await prisma.transaction.count({
        where: {
          disbursement_date: {
            gte: subQuarters(now, 1),
          },
        },
      }),
      SixMonths: await prisma.transaction.count({
        where: {
          disbursement_date: {
            gte: subMonths(now, 6),
          },
        },
      }),
      Year: await prisma.transaction.count({
        where: {
          disbursement_date: {
            gte: subYears(now, 1),
          },
        },
      }),
    };

    // List of top-borrowed books
    const topBorrowedBooks = await prisma.transaction.groupBy({
      by: ["book_id"],
      _count: {
        book_id: true,
      },
      orderBy: {
        _count: {
          book_id: "desc",
        },
      },
      take: 5,
    });

    const bookDetails = await Promise.all(
      topBorrowedBooks.map(async (t) => {
        const book = await prisma.book.findUnique({ where: { id: t.book_id } });
        return { ...book, borrowCount: t._count.book_id };
      })
    );

    res.json({
      booksAddedStats,
      transactionsStats,
      topBorrowedBooks: bookDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch dashboard data." });
  }
};
