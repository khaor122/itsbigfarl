import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { source_id } = await req.json();

  const body = {
    source_id,
    idempotency_key: crypto.randomUUID(),
    amount_money: { amount: 1000, currency: 'USD' },
    location_id: process.env.SQUARE_LOCATION_ID!,
    autocomplete: true,
  };

  const res = await fetch('https://connect.squareupsandbox.com/v2/payments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
