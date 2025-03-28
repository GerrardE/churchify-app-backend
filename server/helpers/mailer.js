const nodemailer = require('nodemailer');

// Create a transporter object using the SMTP details
const emailTransporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com', // Matches your original endpoint
    port: 587, // STARTTLS port
    secure: false, // Use false for port 587 (STARTTLS)
    auth: {
        user: 'AKIAY2JKWEDCGJYXD2TZ', // SMTP user name
        pass: 'BCMK8IIe7udPDIM63ykrj6tOUwtfJWqsaqPnKa9dtyYp' // SMTP password
    },
    tls: {
        rejectUnauthorized: true // Required for AWS SES
    }
});

// const mailOptions = {
//     from: 'portal@trem.org', // Must be verified in SES
//     to: 'obafemifavour@gmail.com',
//     subject: 'Test Email',
//     text: 'This is a test'
// };

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

// sendEmail();
