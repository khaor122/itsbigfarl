// app/api/stripe/checkout/route.ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
    const { packageType } = await req.json();

    const packages: Record<string, { name: string; amount: number }> = {
        consultation: { name: 'Consultation Call', amount: 10000 },     // $100
        rookie: { name: 'Rookie Tier', amount: 200000 },                 // $2,000
        pro: { name: 'Pro Tier', amount: 2000000 },                      // $20,000
        superstar: { name: 'Superstar Tier', amount: 7000000 },         // $70,000
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
                    product_data: {
                        name: selected.name,
                    },
                    unit_amount: selected.amount,
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return NextResponse.json({ url: session.url });
}
