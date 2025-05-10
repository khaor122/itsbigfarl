// app/privacy-policy/page.tsx

'use client';
import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main style={{ padding: '2rem', color: '#fff', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#4ADE80' }}>Privacy Policy</h1>
      <p>
        This is where your Privacy Policy content goes. You can include any legal or user info here.
      </p>

      <h2 style={{ marginTop: '1.5rem' }}>1. Data Collection</h2>
      <p>We collect data such as email, name, and usage behavior to improve the service.</p>

      <h2 style={{ marginTop: '1.5rem' }}>2. Usage of Data</h2>
      <p>Your data is used solely to provide and enhance your experience. We never sell your data.</p>

      <h2 style={{ marginTop: '1.5rem' }}>3. Contact</h2>
      <p>Contact us at <a href="mailto:support@example.com">support@example.com</a> with any concerns.</p>
    </main>
  );
}
