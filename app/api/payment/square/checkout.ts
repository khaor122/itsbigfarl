import { Client, Environment } from 'square';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = new Client({
    environment: 'sandbox',
    accessToken: process.env.SQUARE_ACCESS_TOKEN!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token, amount } = req.body;

    try {
        const result = await client.paymentsApi.createPayment({
            sourceId: token,
            idempotencyKey: crypto.randomUUID(),
            amountMoney: {
                amount,
                currency: 'USD',
            },
        });

        res.status(200).json({ success: true, payment: result.result });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
