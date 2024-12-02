"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BookCard from "../components/BookCard";
import apiClient from "../api/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await apiClient.get("/api/books");
        setBooks(booksResponse.data);

        const analyticsResponse = await apiClient.get(
          "/api/analytics/dashboard-data"
        );
        setAnalytics(analyticsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const booksAddedData = {
    labels: ["Month", "Quarter", "Six Months", " Year"],
    datasets: [
      {
        label: "Books Added",
        data: analytics
          ? [
              analytics.booksAddedStats.Month,
              analytics.booksAddedStats.Quarter,
              analytics.booksAddedStats.SixMonths,
              analytics.booksAddedStats.Year,
            ]
          : [],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const transactionsData = {
    labels: [" Month", "Quarter", "Six Months", " Year"],
    datasets: [
      {
        label: "Books Borrowed",
        data: analytics
          ? [
              analytics.transactionsStats.Month,
              analytics.transactionsStats.Quarter,
              analytics.transactionsStats.SixMonths,
              analytics.transactionsStats.Year,
            ]
          : [],
        borderColor: "rgb(16, 185, 129)",
        tension: 0.1,
      },
    ],
  };

  const topBorrowedBooksData = {
    labels: analytics
      ? analytics.topBorrowedBooks.map((book) => book.title)
      : [],
    datasets: [
      {
        data: analytics
          ? analytics.topBorrowedBooks.map((book) => book.borrowCount)
          : [],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(250, 204, 21, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
      },
    ],
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Library Dashboard
      </h1>

      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <section className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Recent Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        <section className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Analytics</h2>
          {analytics ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Top Borrowed Books
                  </h3>
                </div>
                <div className="p-4">
                  <Doughnut data={topBorrowedBooksData} />
                </div>
                <div className="p-4 border-t border-gray-200">
                  <ul className="text-sm text-gray-600">
                    {analytics.topBorrowedBooks.map((book, index) => (
                      <li key={book.id} className="mb-1">
                        {index + 1}. {book.title} - {book.borrowCount} times
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Books Added
                  </h3>
                </div>
                <div className="p-4">
                  <Bar data={booksAddedData} />
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Total books: {books.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    Added in a year: {analytics.booksAddedStats.Year}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Books Borrowed
                  </h3>
                </div>
                <div className="p-4">
                  <Line data={transactionsData} />
                </div>
                <div className="p-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600"></p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">...</p>
          )}
        </section>
      </div>
    </motion.div>
  );
}

export default Dashboard;
