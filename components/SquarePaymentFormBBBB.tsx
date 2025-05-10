// components/SquarePaymentForm.tsx
'use client';

import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

interface Props {
  amount: number; // amount in cents (e.g., 500 = $5.00)
}

export default function SquarePaymentForm({ amount }: Props) {
  const applicationId = "sandbox-sq0idb-_de5qRfWHkPaJnHF6dgN-w";
  const locationId = "LCPFAYB13J8SG";

  const handlePayment = async (token: any) => {
    try {
      const response = await fetch('/api/submit-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId: token.token, amount: 1000 }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Payment failed:', errorText);
        return;
      }

      const result = await response.json();
      console.log('✅ Payment result:', result);
    } catch (err) {
      console.error('❌ Error during payment request:', err);
    }
  };


  return (
    <PaymentForm
      applicationId={applicationId}
      locationId={locationId}
      cardTokenizeResponseReceived={handlePayment}
    >
      <CreditCard />
    </PaymentForm>
  );
}
