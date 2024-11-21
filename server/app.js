const express = require("express");
const cors = require("cors");
const {
  runEmailJob,
  startReminderService,
} = require("./service/reminderService");

const booksRoutes = require("./routes/booksRoutes");
const employeesRoutes = require("./routes/employeesRoutes");
const transactionsRoutes = require("./routes/transactionsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/transactions", transactionsRoutes);

runEmailJob();
startReminderService();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
