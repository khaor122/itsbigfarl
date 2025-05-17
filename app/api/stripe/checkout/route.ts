import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  // ✅ Do NOT move this outside the function — keeps env safe at build time
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  console.log("LOADED STRIPE KEY:", process.env.STRIPE_SECRET_KEY);

  if (!stripeSecretKey) {
    return NextResponse.json({ error: "Stripe secret key is missing" }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
  });

  try {
    const { packageType } = await req.json();

    const packages: Record<string, { name: string; amount: number }> = {
      consultation: { name: 'Consultation Call', amount: 10000 },
      feature: { name: 'Feature Package', amount: 100000 },
      rookie: { name: 'Rookie Tier', amount: 200000 },
      pro: { name: 'Pro Tier', amount: 2000000 },
      superstar: { name: 'Superstar Tier', amount: 7000000 },
    };

    const selected = packages[packageType.toLowerCase()];
    if (!selected) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selected.name,
            },
            unit_amount: selected.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
