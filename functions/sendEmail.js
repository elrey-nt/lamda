// functions/sendEmail.js

const nodemailer = require('nodemailer');

exports.handler = async function (event) {
  const { name, email, message } = JSON.parse(event.body);

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'n.ettouzany@gmail.com', // your email address
        password: 'Noureddine@2012' // your password
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
