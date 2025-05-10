// app/admin/email/page.tsx
'use client';

import { useState } from 'react';

export default function EmailPage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendEmail = async () => {
    setStatus('Sending...');
    const res = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ to, subject, message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      setStatus('✅ Email sent successfully!');
    } else {
      setStatus('❌ Failed to send email');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Send Email</h1>
      <input
        type="email"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border mb-3 rounded h-40"
      />
      <button
        onClick={sendEmail}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Send
      </button>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}
