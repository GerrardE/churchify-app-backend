const nodemailer = require('nodemailer');

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

export async function sendEmail(mailOptions) {
    try {
        const result = await emailTransporter.sendMail(mailOptions);
        console.log('Email sent:', result.response);
        return result;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    };
};
