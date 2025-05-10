//D:\Bigfarl\bigfarl ad\middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyJWT } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value

console.log('tokentoken', token);

  if (!token || !await verifyJWT(token)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
