import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import PropTypes from "prop-types";

function BookForm({ book, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publication_year: "",
    available_copies: "",
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">
        {book ? "Edit Book" : "Add New Book"}
      </h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-bold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block mb-2 font-bold">
          Author:
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="isbn" className="block mb-2 font-bold">
          ISBN:
        </label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="publication_year" className="block mb-2 font-bold">
          Publication Year:
        </label>
        <input
          type="number"
          id="publication_year"
          name="publication_year"
          value={formData.publication_year}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="available_copies" className="block mb-2 font-bold">
          Available Copies:
        </label>
        <input
          type="number"
          id="available_copies"
          name="available_copies"
          value={formData.available_copies}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {book ? "Update Book" : "Add Book"}
        </motion.button>
      </div>
    </motion.form>
  );
}

BookForm.propTypes = {
  book: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BookForm;
