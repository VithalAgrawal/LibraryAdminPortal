const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Reminder sent:", info.response);
    }
  });
};