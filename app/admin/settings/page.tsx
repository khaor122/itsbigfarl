// app/admin/settings/page.tsx
"use client"

import { useEffect, useState } from "react"
import { getAllSettings, updateSetting } from "@/actions/settings-actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllSettings().then(res => {
      if (res.success) {
        const s: Record<string, string> = {}
        res.data.forEach((item: any) => {
          s[item.key] = item.value
        })
        setSettings(s)
      }
    })
  }, [])

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async (key: string) => {
    setLoading(true)
    const res = await updateSetting(key, settings[key])
    setLoading(false)
    alert(res.success ? "Saved!" : "Error saving")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>

      {Object.entries(settings).map(([key, value]) => (
        <div key={key} className="mb-4">
          <label className="block font-semibold mb-1">{key}</label>
          <div className="flex gap-2">
            <Input
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
            />
            <Button onClick={() => handleSave(key)} disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      ))}

      {Object.keys(settings).length === 0 && (
        <p className="text-gray-500">No settings found.</p>
      )}
    </div>
  )
}
