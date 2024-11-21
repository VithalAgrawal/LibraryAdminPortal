import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function ReturnBook() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const fetchBorrowedBooks = async (employeeId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/transactions?status=borrowed&employee_id=${employeeId}`
      );
      setBorrowedBooks(response.data);
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
    }
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
    if (employeeId) {
      fetchBorrowedBooks(employeeId);
    } else {
      setBorrowedBooks([]);
    }
  };

  const handleReturn = async (transactionId) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/api/transactions/${transactionId}/return`
      );
      fetchBorrowedBooks(selectedEmployee);
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Return a Book</h1>
      <div className="mb-6">
        <label htmlFor="employee" className="block mb-2 font-bold">
          Select an Employee:
        </label>
        <select
          id="employee"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}.({employee.id})
            </option>
          ))}
        </select>
      </div>
      {borrowedBooks.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Borrowed Books</h2>
          <ul>
            {borrowedBooks.map((transaction) => (
              <li key={transaction.id} className="mb-4 p-4 border rounded">
                <p>
                  <strong>Book:</strong> {transaction.book.title}
                </p>
                <p>
                  <strong>Borrow Date:</strong>{" "}
                  {new Date(transaction.disbursement_date).toLocaleDateString()}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReturn(transaction.id)}
                >
                  Return Book
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        selectedEmployee && <p>No books currently borrowed by this employee.</p>
      )}
    </motion.div>
  );
}

export default ReturnBook;
