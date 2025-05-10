// app/api/form/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phone, selectedPackage, score } = body;

        const newSubmission = await prisma.submission.create({
            data: {
                phone,
                selectedPackage,
                score,
            },
        });

        return NextResponse.json({ success: true, submission: newSubmission });
    } catch (error) {
        console.error("[FORM_POST_ERROR]", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
