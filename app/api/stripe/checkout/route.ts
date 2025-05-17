import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });

  const { packageType } = await req.json();

  const packages: Record<string, { name: string; amount: number }> = {
    consultation: { name: 'Consultation Call', amount: 10000 },
    rookie: { name: 'Rookie Tier', amount: 200000 },
    pro: { name: 'Pro Tier', amount: 2000000 },
    superstar: { name: 'Superstar Tier', amount: 7000000 },
  };

  const selected = packages[packageType];

  if (!selected) {
    return NextResponse.json({ error: 'Invalid package type' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: selected.name },
          unit_amount: selected.amount,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
