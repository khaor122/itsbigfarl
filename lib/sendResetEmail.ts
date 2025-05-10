// lib/sendResetEmail.ts
export async function sendResetEmail(to: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  // Example using console.log; replace with actual email logic (like nodemailer or Resend)
  console.log(`Send reset email to ${to}: ${resetUrl}`);

  // Replace this with your email provider logic
}
