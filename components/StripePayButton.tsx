'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function StripePayButton({ packageType }: { packageType: string }) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        // alert(packageType)
        setLoading(true);
        const res = await fetch('/api/stripe/checkout', {
            method: 'POST',
            body: JSON.stringify({ packageType }),
        });

        console.log('resresresres', res);

        const data = await res.json();
        if (data?.url) {
            window.location.href = data.url;
        } else {
            alert('Payment session creation failed.');
        }
        setLoading(false);
    };

    return (
        <Button
            onClick={handleClick}
            disabled={loading}
            className="bg-green-700 hover:bg-green-600 text-black font-mono border-2 border-green-400 disabled:opacity-50"
        >
            {loading ? 'Redirecting...' : 'Pay with Stripe for ' + packageType}
        </Button>
    );
}
