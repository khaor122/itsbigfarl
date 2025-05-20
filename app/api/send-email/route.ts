// app/api/send-email/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { to, subject, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'Bigfarl <onboarding@resend.dev>',
      to,
      subject,
      html: `<div>${message}</div>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
  }
}
