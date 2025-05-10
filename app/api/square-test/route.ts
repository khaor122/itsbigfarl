import { NextResponse } from "next/server";
import { SquareClient } from "square";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!
});

export async function GET() {
  try {
    const res = await client.locations.list(); // correct method
    return NextResponse.json({ locations: res.locations });
  } catch (err: any) {
    console.error("❌ Square Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
