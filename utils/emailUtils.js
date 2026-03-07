const nodemailer = require("nodemailer");

/**
 * Sends an email using nodemailer.
 * @param {string} to - Recipient email.
 * @param {string} subject - Email subject.
 * @param {string} html - HTML content of the email.
 */
const sendEmail = async (to, subject, html) => {
  try {
    // Create a transporter
    // Defaulting to Gmail service as it's common.
    // User needs to provide EMAIL_USER and EMAIL_PASS in .env
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App Password if using Gmail
      }
    });

    const mailOptions = {
      from: `"Super Knee Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = { sendEmail };
