'use client';

import {
  PaymentsForm,
  CreditCard
} from 'react-square-web-payments-sdk';
import { useState } from 'react';

export default function SquareCardForm() {
  const [status, setStatus] = useState('');

  return (
    <div className="p-6 border rounded max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Pay with Card</h2>
      <PaymentsForm
        applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!}
        locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          setStatus('Processing...');

          const res = await fetch('/api/square', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              source_id: token.token,
              amount: 1000,
              label: 'Big Farl Purchase'
            }),
          });

          const data = await res.json();
          if (res.ok) {
            setStatus('✅ Payment Successful!');
          } else {
            setStatus(`❌ ${data.error?.[0]?.detail || 'Payment Failed'}`);
          }
        }}
      >
        <CreditCard />
      </PaymentsForm>
      <p className="mt-3 text-sm text-gray-700">{status}</p>
    </div>
  );
}
