import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SuccessPage({ searchParams }: { searchParams: { id?: string } }) {
  const submissionId = searchParams.id || "unknown"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="border-4 border-green-400 rounded-lg p-8 max-w-md w-full bg-black text-center">
        <h1 className="text-green-400 text-2xl font-mono mb-6">MISSION COMPLETE!</h1>

        <div className="border-2 border-green-400 bg-black p-4 rounded-lg mb-6">
          <p className="text-green-400 font-mono">
            Thank you for joining with&quot;Big Farl&quot; membership!
          </p>
          <p className="text-green-400 font-mono mt-4">Your submission ID: {submissionId}</p>
        </div>

        <Link href="/">
          <Button className="bg-green-700 hover:bg-green-600 text-black font-mono border-2 border-green-400">
            RETURN TO HOME
          </Button>
        </Link>
      </div>
    </div>
  )
}
