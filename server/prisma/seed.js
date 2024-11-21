const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const BOOK_COUNT = 50;
const EMPLOYEE_COUNT = 20;
const TRANSACTION_COUNT = 30;

const bookTitles = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Pride and Prejudice",
  "The Catcher in the Rye",
  "Animal Farm",
  "Lord of the Flies",
  "The Hobbit",
  "Fahrenheit 451",
  "Jane Eyre",
  "Brave New World",
  "The Odyssey",
  "Moby-Dick",
  "The Grapes of Wrath",
  "Wuthering Heights",
  "The Scarlet Letter",
  "Frankenstein",
  "Don Quixote",
  "The Iliad",
  "War and Peace",
  "Crime and Punishment",
  "Hamlet",
  "The Adventures of Huckleberry Finn",
  "Alice's Adventures in Wonderland",
  "The Picture of Dorian Gray",
  "The Count of Monte Cristo",
  "Anna Karenina",
  "Les Misérables",
  "One Hundred Years of Solitude",
  "The Brothers Karamazov",
];

const authors = [
  "Harper Lee",
  "George Orwell",
  "F. Scott Fitzgerald",
  "Jane Austen",
  "J.D. Salinger",
  "William Golding",
  "J.R.R. Tolkien",
  "Ray Bradbury",
  "Charlotte Brontë",
  "Aldous Huxley",
  "Homer",
  "Herman Melville",
  "John Steinbeck",
  "Emily Brontë",
  "Nathaniel Hawthorne",
  "Mary Shelley",
  "Miguel de Cervantes",
  "Leo Tolstoy",
  "Fyodor Dostoevsky",
  "William Shakespeare",
  "Mark Twain",
  "Lewis Carroll",
  "Oscar Wilde",
  "Alexandre Dumas",
  "Victor Hugo",
  "Gabriel García Márquez",
];

function generateISBN() {
  return Array(13)
    .fill()
    .map(() => Math.floor(Math.random() * 10))
    .join("");
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function main() {
  // Create books
  const books = [];
  for (let i = 0; i < BOOK_COUNT; i++) {
    const book = await prisma.book.create({
      data: {
        title: getRandomElement(bookTitles),
        author: getRandomElement(authors),
        isbn: generateISBN(),
        publication_year: Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900,
        available_copies: Math.floor(Math.random() * 11),
      },
    });
    books.push(book);
  }

  console.log(`Created ${BOOK_COUNT} books.`);

  // Create employees
  const employees = [];
  for (let i = 0; i < EMPLOYEE_COUNT; i++) {
    const employee = await prisma.employee.create({
      data: {
        name: `Employee ${i + 1}`,
        email: `employee${i + 1}@library.com`,
      },
    });
    employees.push(employee);
  }

  console.log(`Created ${EMPLOYEE_COUNT} employees.`);

  // Create transactions
  for (let i = 0; i < TRANSACTION_COUNT; i++) {
    const book = getRandomElement(books);
    const employee = getRandomElement(employees);
    const disbursementDate = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    );
    const loanDuration = Math.floor(Math.random() * 30) + 1;
    const returnDate =
      Math.random() > 0.5
        ? new Date(
            disbursementDate.getTime() + loanDuration * 24 * 60 * 60 * 1000
          )
        : null;

    await prisma.transaction.create({
      data: {
        book_id: book.id,
        employee_id: employee.id,
        disbursement_date: disbursementDate,
        return_date: returnDate,
        loan_duration: loanDuration,
      },
    });

    // Update book's available copies if the book is not returned
    if (!returnDate) {
      await prisma.book.update({
        where: { id: book.id },
        data: {
          available_copies: {
            decrement: 1,
          },
        },
      });
    }
  }

  console.log(`Created ${TRANSACTION_COUNT} transactions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
