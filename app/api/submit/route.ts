import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Make sure this path is correct
import { sendSubmissionEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      username,
      phone,
      email,
      referralSource,
      referrerUsername,
    } = body;

    // Save to database
    const submission = await prisma.submission.create({
      data: {
        username,
        phone,
        email,
        referralSource,
        referrerUsername,
      },
    });

    // Send confirmation email
    await sendSubmissionEmail({
      to: email,
      username,
      phone,
      email,
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
