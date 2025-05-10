// app/api/bank-accounts/route.ts
import { SquareClient } from "square";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = new SquareClient({ 
      token: process.env.SQUARE_ACCESS_TOKEN || ""
    });
    
    const response = await client.bankAccountsApi.listBankAccounts();
    
    return NextResponse.json({
      bankAccounts: response.result.bankAccounts || []
    });
  } catch (err: any) {
    console.error("❌ Square API Error:", err);
    return NextResponse.json(
      { error: err.message || "Unexpected error" },
      { status: err.statusCode || 500 }
    );
  }
}