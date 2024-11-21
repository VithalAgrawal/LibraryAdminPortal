/*import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function BorrowBook() {
  const [books, setBooks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [loanDuration, setLoanDuration] = useState(7);

  useEffect(() => {
    fetchBooks();
    fetchEmployees();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/books`
      );
      setBooks(response.data.filter((book) => book.available_copies > 0));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/transactions`, {
        book_id: selectedBook,
        employee_id: selectedEmployee,
        loan_duration: loanDuration,
      });
      alert("Book borrowed successfully!");
      setSelectedBook("");
      setSelectedEmployee("");
      setLoanDuration(7);
      fetchBooks();
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Error borrowing book. Please try again.");
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Borrow a Book</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="book" className="block mb-2">
            Select a Book:
          </label>
          <select
            id="book"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select a book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} by {book.author}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="employee" className="block mb-2">
            Select an Employee:
          </label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block mb-2">
            Loan Duration (days):
          </label>
          <input
            type="number"
            id="duration"
            value={loanDuration}
            onChange={(e) => setLoanDuration(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            min="7"
            max="28"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Borrow Book
        </motion.button>
      </form>
    </motion.div>
  );
}

export default BorrowBook;*/
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function BorrowBook() {
  const [books, setBooks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [loanDuration, setLoanDuration] = useState(7);

  // Initialize disbursementDate in the correct format for datetime-local
  const [disbursementDate, setDisbursementDate] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });

  useEffect(() => {
    fetchBooks();
    fetchEmployees();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/books`
      );
      setBooks(response.data.filter((book) => book.available_copies > 0));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/transactions`, {
        book_id: selectedBook,
        employee_id: selectedEmployee,
        loan_duration: loanDuration,
        disbursement_date: new Date(disbursementDate).toISOString(), // Convert to ISO string for API
      });
      alert("Book borrowed successfully!");
      setSelectedBook("");
      setSelectedEmployee("");
      setLoanDuration(7);
      fetchBooks(); // Refresh book availability
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Error borrowing book. Please try again.");
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Borrow a Book</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="book" className="block mb-2">
            Select a Book:
          </label>
          <select
            id="book"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select a book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} by {book.author}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="employee" className="block mb-2">
            Select an Employee:
          </label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="disbursementDate" className="block mb-2">
            Disbursement Date:
          </label>
          <input
            type="date"
            id="disbursementDate"
            value={disbursementDate}
            onChange={(e) => setDisbursementDate(e.target.value)} // No extra conversion needed
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block mb-2">
            Loan Duration (days):
          </label>
          <input
            type="number"
            id="duration"
            value={loanDuration}
            onChange={(e) => setLoanDuration(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            min="7"
            max="28"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Borrow Book
        </motion.button>
      </form>
    </motion.div>
  );
}

export default BorrowBook;
