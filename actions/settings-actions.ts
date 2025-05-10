// actions/settings-actions.ts
import { prisma } from 'd:/Bigfarl/bigfarl/lib/prisma';


export async function getAllSettings() {
  try {
    const settings = await prisma.setting.findMany()
    return { success: true, data: settings }
  } catch (error) {
    return { success: false, error: "Failed to load settings", data: [] }
  }
}

export async function updateSetting(key: string, value: string) {
  try {
    const updated = await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
    return { success: true, data: updated }
  } catch (error) {
    return { success: false, error: "Failed to update setting" }
  }
}
