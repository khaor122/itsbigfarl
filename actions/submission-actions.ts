// actions/submission-actions.ts
import { prisma } from "@/lib/prisma"


export async function getSubmissions() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
    })
    return { success: true, data: submissions }
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return { success: false, error: "Failed to load submissions", data: [] }
  }
}
