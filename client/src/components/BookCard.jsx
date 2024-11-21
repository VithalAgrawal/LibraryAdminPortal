import { motion } from "framer-motion";

import PropTypes from "prop-types";

function BookCard({ book, onEdit, onDelete }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 mb-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
      <p className="text-gray-600 mb-2">
        by {book.author} (ISBN: {book.isbn})
      </p>
      <p className="mb-2">Available copies: {book.available_copies}</p>
      <p className="mb-2">
        Status:{" "}
        {book.available_copies > 0
          ? `${book.available_copies} available`
          : "All borrowed"}
      </p>
      {book.borrowers && book.borrowers.length > 0 && (
        <div className="mb-2">
          <p className="font-semibold">Borrowed by:</p>
          <ul className="list-disc list-inside">
            {book.borrowers.map((borrower, index) => (
              <li key={index}>
                {borrower.name} (Due:{" "}
                {new Date(borrower.due_date).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>
      )}
      {onEdit && onDelete && (
        <div className="flex justify-end space-x-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => onEdit(book)}
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => onDelete(book.id)}
          >
            Delete
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookCard;
