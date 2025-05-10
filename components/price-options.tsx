"use client";

import { useState } from "react";

const priceOptions = [
  { label: "$100 for Consultation", amount: 10000 },
  { label: "$1000 for Feature ($100 discount)", amount: 100000 },
  { label: "$2000 Rookie", amount: 200000 },
  { label: "$20,000 Pro", amount: 2000000 },
  { label: "$70,000 Superstar", amount: 7000000 },
];

export default function PriceOptions() {
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (selected === null) return alert("Please select a package");

    setLoading(true);
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(priceOptions[selected]),
    });

    const data = await res.json();
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert("Payment failed");
    }
    setLoading(false);
  };

  return (
    <div className="text-green-400 font-mono">
      <h2 className="text-2xl mb-4 text-center">Choose your package:</h2>

      <div className="space-y-2">
        {priceOptions.map((option, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={`border p-4 cursor-pointer rounded ${
              selected === i ? "border-green-500 bg-green-900" : "border-green-700"
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={selected === null || loading}
        className="mt-6 bg-green-500 text-black px-6 py-2 rounded hover:bg-green-400"
      >
        {loading ? "Redirecting..." : "Submit"}
      </button>
    </div>
  );
}
