'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TVShutdown from "@/components/TVShutdown";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ import router

export default function SuccessPage({ searchParams }: { searchParams: { id?: string } }) {
  const submissionId = searchParams.id || "unknown";
  const [tvShutdownAction, setTvShutdownAction] = useState(false);
  const router = useRouter(); // ✅ get router instance

  return (
    <>
      {!tvShutdownAction && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
          <div className="border-4 border-green-400 rounded-lg p-8 max-w-md w-full bg-black text-center">
            <h1 className="text-green-400 text-2xl font-mono mb-6">MISSION COMPLETE!</h1>

            <div className="border-2 border-green-400 bg-black p-4 rounded-lg mb-6">
              <p className="text-green-400 font-mono">
                Thank you for joining with "Big Farl" membership!
              </p>
              <p className="text-green-400 font-mono mt-4">Your submission ID: {submissionId}</p>
            </div>

            <Button
              onClick={() => setTvShutdownAction(true)}
              style={{ marginRight: '10px' }}
              className="bg-green-700 hover:bg-green-600 text-black font-mono border-2 border-green-400"
            >
              Shut Down
            </Button>

            <Link href="/">
              <Button className="bg-green-700 hover:bg-green-600 text-black font-mono border-2 border-green-400">
                RETURN TO HOME
              </Button>
            </Link>
          </div>
        </div>
      )}

      {tvShutdownAction && (
        <TVShutdown
          duration={2000}
          onFinish={() => router.push('/playlist')} // ✅ redirect here
        />
      )}
    </>
  );
}
