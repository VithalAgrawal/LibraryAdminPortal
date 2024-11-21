import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import BookForm from "../components/BookForm";

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [isAddingBook, setIsAddingBook] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/books`
      );
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)
    );
    setFilteredBooks(filtered);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsAddingBook(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSave = async (book) => {
    try {
      if (book.id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/books/${book.id}`,
          book
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/books`, book);
      }
      setEditingBook(null);
      setIsAddingBook(false);
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Books</h1>
      <div className="mb-8 gap-4 flex items-center justify-center">
        <div className="flex-1 my-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setIsAddingBook(true);
            setEditingBook(null);
          }}
        >
          Add New Book
        </motion.button>
      </div>
      {(editingBook || isAddingBook) && (
        <BookForm
          book={editingBook}
          onSave={handleSave}
          onCancel={() => {
            setEditingBook(null);
            setIsAddingBook(false);
          }}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Books;
