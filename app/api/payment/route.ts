import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { source_id, amount, label } = await req.json();

    if (!source_id || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing source_id or amount' },
        { status: 400 }
      );
    }

    const response = await fetch('https://connect.squareupsandbox.com/v2/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_id,
        idempotency_key: crypto.randomUUID(),
        amount_money: {
          amount: Number(amount),
          currency: 'USD',
        },
        location_id: process.env.SQUARE_LOCATION_ID!,
        note: label || 'Big Farl Purchase',
        autocomplete: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, error: data.errors }, { status: response.status });
    }

    return NextResponse.json({ success: true, payment: data.payment });

  } catch (err: any) {
    console.error('Payment processing error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Unexpected error' }, { status: 500 });
  }
}
