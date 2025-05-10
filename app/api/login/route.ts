// app/api/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createJWT } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
  // alert(1)
  const token = await  createJWT(user);
  
  // const token = createJWT({ id: 1, email:'khao122@gmail.com', role: 'admin' });
  console.log('routeToken', token)
  // alert(2)
  const response = new NextResponse(JSON.stringify({ message: "Login successful" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  response.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // secure: false,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
