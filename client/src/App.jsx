import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import TransactionHistory from "./pages/TransactionHistory";
import BorrowBook from "./pages/BorrowBook";
import ReturnBook from "./pages/ReturnBook";

function App() {
  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen">
        <Navbar />
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/borrow" element={<BorrowBook />} />
            <Route path="/return" element={<ReturnBook />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
