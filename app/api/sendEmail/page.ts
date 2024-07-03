// pages/api/sendEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, phone, subject, message, dropdown } = req.body;

  try {
    await sendgrid.send({
      to: 'abdishakour.moyousuf@gmail.com', // Change to your recipient email
      from: 'your-email@example.com', // Change to your verified sender email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>How did you hear about us:</strong> ${dropdown}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error sending email' });
  }
};

export default sendEmail;
