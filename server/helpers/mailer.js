const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT, // STARTTLS port
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME, // SMTP user name
    pass: process.env.SMTP_PASSWORD // SMTP password
  },
  tls: {
    rejectUnauthorized: true // Required for AWS SES
  }
});

/**
 * Sends an email using the configured transporter.
 * @param {Object} mailOptions - The email options object.
 * @returns {Promise<Object>} The result from nodemailer.
 * @throws Will throw an error if sending fails.
 */
export default async function sendEmail(mailOptions) {
  return emailTransporter.sendMail(mailOptions);
}
