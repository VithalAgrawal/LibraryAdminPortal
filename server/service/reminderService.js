/*const cron = require("node-cron");
const nodemailer = require("nodemailer");
const prisma = require("../config/prisma");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running daily email job...");

    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + 3);

    const transactions = await prisma.transaction.findMany({
      where: {
        return_date: null,
        email_sent: false,
        disbursement_date: {
          lte: new Date(),
        },
      },
      include: {
        employee: true,
        book: true,
      },
    });

    for (const transaction of transactions) {
      const dueDate = new Date(
        transaction.disbursement_date.getTime() +
          transaction.loan_duration * 24 * 60 * 60 * 1000
      );

      if (
        dueDate.toISOString().split("T")[0] ===
        reminderDate.toISOString().split("T")[0]
      ) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: transaction.employee.email,
          subject: "Reminder: Book Return Due in 3 Days",
          text: `Hi ${
            transaction.employee.name
          },\n\nThis is a reminder that the book "${
            transaction.book.title
          }" is due for return on ${dueDate.toDateString()}.\n\nPlease make sure to return it on time to avoid any penalties.\n\nThank you!`,
        };

        await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log("Error sending email:", error);
          } else {
            console.log("Reminder sent:", info.response);
            await prisma.transaction.update({
              where: { id: transaction.id },
              data: { email_sent: true },
            });
          }
        });

        console.log(`Reminder email sent to ${transaction.employee.email}`);
      }
    }
  } catch (error) {
    console.error("Error running email job:", error);
  }
});*/
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const prisma = require("../config/prisma");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const runEmailJob = async () => {
  try {
    console.log("Running email reminder job...");

    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + 3);

    const transactions = await prisma.transaction.findMany({
      where: {
        return_date: null,
        email_sent: false,
        disbursement_date: {
          lte: new Date(),
        },
      },
      include: {
        employee: true,
        book: true,
      },
    });

    for (const transaction of transactions) {
      const dueDate = new Date(
        transaction.disbursement_date.getTime() +
          transaction.loan_duration * 24 * 60 * 60 * 1000
      );

      const { isBefore } = require("date-fns");
      if (isBefore(dueDate, reminderDate)) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: transaction.employee.email,
          subject: "Reminder: Book Return Due in 3 Days",
          text: `Hi ${
            transaction.employee.name
          },\n\nThis is a reminder that the book "${
            transaction.book.title
          }" is due for return on ${dueDate.toDateString()}.\n\nPlease make sure to return it on time to avoid any penalties.\n\nThank you!`,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`Reminder sent to ${transaction.employee.email}`);

          // Update the database to mark email as sent
          await prisma.transaction.update({
            where: { id: transaction.id },
            data: { email_sent: true },
          });
        } catch (emailError) {
          console.log("Error sending email:", emailError);
        }
      }
    }
  } catch (error) {
    console.error("Error running email reminder job:", error);
  }
};

const startReminderService = () => {
  // Schedule the email reminder job to run daily at midnight
  cron.schedule("0 0 * * *", runEmailJob);
  console.log("Cron job triggered...");
};

module.exports = { runEmailJob, startReminderService };
