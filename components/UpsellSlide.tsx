"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface PackageOfferProps {
  onPaymentComplete: () => void
}

export default function PackageOffer({ onPaymentComplete }: PackageOfferProps) {
  const [acceptedUpsell, setAcceptedUpsell] = useState(false)
  const [isPaying, setIsPaying] = useState(false)

  const handlePayment = () => {
    setIsPaying(true)
    setTimeout(() => {
      setIsPaying(false)
      onPaymentComplete()
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400 font-mono p-4">
      <h2 className="text-2xl mb-6">Choose Your Package</h2>

      <div className="border border-green-400 p-4 mb-4 w-full max-w-md">
        <h3 className="text-xl mb-2">Option A</h3>
        <p>$100 Consultation Fee</p>
        <p>
          Upsell: $1000 Feature{" "}
          <Button
            variant="ghost"
            className="underline ml-2 text-green-500"
            onClick={() => setAcceptedUpsell(!acceptedUpsell)}
          >
            {acceptedUpsell ? "Remove Upsell (-$100)" : "Add Upsell (-$100)"}
          </Button>
        </p>
        <p className="mt-2">
          Total: ${acceptedUpsell ? 1000 - 100 + 100 : 100}
        </p>
      </div>

      <div className="border border-green-400 p-4 mb-6 w-full max-w-md">
        <h3 className="text-xl mb-2">Option B</h3>
        <ul className="list-disc list-inside">
          <li>$2K Rookie Media Production</li>
          <li>$20K Pro Media Production</li>
          <li>$70K Superstar Media Production</li>
        </ul>
      </div>

      <Button
        onClick={handlePayment}
        disabled={isPaying}
        className="bg-green-700 hover:bg-green-600 text-black border border-green-400"
      >
        {isPaying ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  )
}
