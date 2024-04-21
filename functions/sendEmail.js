// functions/sendEmail.js

const nodemailer = require('nodemailer');

exports.handler = async function (event) {
  const { name, email, message } = JSON.parse(event.body);

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Your SMTP host
    port: 587, // Your SMTP port
    secure: false, // false for TLS, true for SSL
    auth: {
      user: 'your-email@example.com', // Your email
      pass: 'your-password' // Your email password
    }
  });

  // Setup email data
  const mailOptions = {
    from: 'your-email@example.com',
    to: 'recipient@example.com', // Recipient's email
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' })
    };
  }
};
