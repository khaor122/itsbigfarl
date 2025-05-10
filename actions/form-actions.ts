"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { sendSubmissionEmail } from "@/lib/email"

export type FormData = {
  name: string
  reference: string
  username: string
  email: string
  phone?: string
  package: string
  emailStatus?: string // ✅ Added this line
}


export async function submitFormData(data: FormData) {
  try {
    const submission = await prisma.submission.create({
      data: {
        name: data.name,
        reference: data.reference,
        username: data.username,
        email: data.email,
        phone: data.phone || "",
        package: data.package,
        emailStatus: "pending", // ✅ default value
      },
    })
    

    // Send confirmation email
    let emailStatus = "pending"

try {
  await sendSubmissionEmail({
    to: data.email,
    username: data.username,
    phone: data.phone || "",
    email: data.email,
  })
  emailStatus = "sent"
} catch (error) {
  console.error("Email sending failed:", error)
  emailStatus = "failed"
}

// Update the submission with email status
await prisma.submission.update({
  where: { id: submission.id },
  data: { emailStatus },
})


    revalidatePath("/admin")
    return { success: true, id: submission.id }
  } catch (error) {
    console.error("Error submitting form:", error)
    return { success: false, error: "Failed to submit form" }
  }
}

export async function getFormSubmissions() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, data: submissions }
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return { success: false, error: "Failed to fetch submissions" }
  }
}
