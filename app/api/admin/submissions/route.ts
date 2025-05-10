// app/api/admin/submissions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Assuming you already have prisma set up
import { isAdminAuthenticated } from '@/lib/auth';  // Make sure the import is correct

export async function DELETE(req: NextRequest) {
  // Step 1: Ensure the request is from an authenticated admin
  const authorized = await isAdminAuthenticated(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Step 2: Extract ids from the request body
    const { ids } = await req.json();

    // Step 3: Ensure the ids are valid (array of ids)
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Step 4: Perform the deletion operation on the database using Prisma
    await prisma.submission.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Step 5: Respond with success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
