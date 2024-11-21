import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Library Management Portal
        </Link>
        <motion.ul className="flex space-x-4">
          {[
            ["Dashboard", "/"],
            ["Books", "/books"],
            ["Transactions", "/transactions"],
            ["Borrow", "/borrow"],
            ["Return", "/return"],
          ].map(([title, url]) => (
            <motion.li
              key={title}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={url} className="hover:text-blue-200">
                {title}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </nav>
  );
}

export default Navbar;
