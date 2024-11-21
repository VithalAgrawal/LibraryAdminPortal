import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/transactions`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Book</th>
              <th className="py-3 px-6 text-left">Employee ID</th>
              <th className="py-3 px-6 text-left">Employee</th>
              <th className="py-3 px-6 text-left">Borrow Date</th>
              <th className="py-3 px-6 text-left">Return Date</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {transactions
              .slice()
              .reverse()
              .map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {transaction.book.title}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {transaction.employee.id}
                  </td>

                  <td className="py-3 px-6 text-left">
                    {transaction.employee.name}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(
                      transaction.disbursement_date
                    ).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {transaction.return_date
                      ? new Date(transaction.return_date).toLocaleDateString()
                      : "Not returned"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        transaction.return_date
                          ? "bg-green-200 text-green-600"
                          : "bg-yellow-200 text-yellow-600"
                      }`}
                    >
                      {transaction.return_date ? "Returned" : "Borrowed"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default TransactionHistory;
