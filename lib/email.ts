// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSubmissionEmail({
  to,
  username,
  phone,
  email,
}: {
  to: string;
  username: string;
  phone: string;
  email: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: '✅ Form Submitted Successfully!',
      html: `<p>Hi <strong>${username}</strong>,</p>
             <p>Thank you for your submission. Here are your details:</p>
             <ul>
               <li>📱 Phone: ${phone}</li>
               <li>📧 Email: ${email}</li>
             </ul>
             <p>We’ll get back to you shortly!</p>`,
    });

    if (error) console.error('Resend error:', error);
    return { success: !error };
  } catch (err) {
    console.error('Email send failed:', err);
    return { success: false };
  }
}
