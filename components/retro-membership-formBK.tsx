"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import TypewriterEffect from "@/components/typewriter-effect"
import { submitFormData } from "@/actions/form-actions"
import { toast } from "@/components/ui/use-toast"

// Character images for each step with metadata
const characterImages = [
  {
    src: "/images/character-1.png",
    alt: "Jabari 'Big Farl' Greer waving with a friendly smile",
    width: 400,
    height: 400,
  },
  {
    src: "/images/character-2.png",
    alt: "Jabari 'Big Farl' Greer asking where you found him",
    width: 400,
    height: 400,
  },
  {
    src: "/images/character-3.png",
    alt: "Jabari 'Big Farl' Greer asking for your username",
    width: 400,
    height: 400,
  },
  {
    src: "/images/character-4.png",
    alt: "Jabari 'Big Farl' Greer offering free merch",
    width: 400,
    height: 400,
  },
  {
    src: "/images/character-5.png",
    alt: "Jabari 'Big Farl' Greer asking for your contact info",
    width: 400,
    height: 400,
  },
  {
    src: "/images/character-6.png",
    alt: "Jabari 'Big Farl' Greer ready to get started",
    width: 400,
    height: 400,
  },
]

// Phrases for each step
const phrases = [
  'Hey my name is Jabari "Big Farl" Greer. What\'s your name?',
  "Nice to meet you! Where did you see me? Threads or Instagram?",
  "Enter your username",
  "Would you like to enter into a chance to win free merch? Add your email",
  "What's your number or later",
  "Let's get started",
]

export default function RetroMembershipForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    platform: "",
    username: "",
    email: "",
    phone: "",
  })
  const [typingComplete, setTypingComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Toggle cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle radio button selection
  const handlePlatformSelect = (platform: string) => {
    setFormData((prev) => ({ ...prev, platform }))
  }

  // Handle form submission for each step
  const handleNext = async () => {
    // Validate current step
    if (currentStep === 0 && !formData.name) return
    if (currentStep === 1 && !formData.platform) return
    if (currentStep === 2 && !formData.username) return
    if (currentStep === 3 && !formData.email) return

    // Move to next step or submit form
    if (currentStep < phrases.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setTypingComplete(false)
    } else {
      // Submit form data to database
      try {
        setIsSubmitting(true)
        const result = await submitFormData(formData)

        if (result.success) {
          toast({
            title: "Success!",
            description: "Your membership application has been submitted.",
          })
          // Reset form or redirect
          router.push(`/success?id=${result.id}`)
        } else {
          toast({
            title: "Error",
            description: "There was a problem submitting your application. Please try again.",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem submitting your application. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Render form fields based on current step
  const renderFormField = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="w-full mt-6">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="bg-black border-green-400 text-green-400 placeholder:text-green-700"
              aria-label="Your name"
            />
          </div>
        )
      case 1:
        return (
          <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant={formData.platform === "instagram" ? "default" : "outline"}
                className={cn("border-green-400 text-green-400", formData.platform === "instagram" && "bg-green-900")}
                onClick={() => handlePlatformSelect("instagram")}
                aria-label="Instagram"
              >
                Instagram
              </Button>
              <Button
                type="button"
                variant={formData.platform === "threads" ? "default" : "outline"}
                className={cn("border-green-400 text-green-400", formData.platform === "threads" && "bg-green-900")}
                onClick={() => handlePlatformSelect("threads")}
                aria-label="Threads"
              >
                Threads
              </Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="w-full mt-6">
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={`Your ${formData.platform} username`}
              className="bg-black border-green-400 text-green-400 placeholder:text-green-700"
              aria-label="Your username"
            />
          </div>
        )
      case 3:
        return (
          <div className="w-full  mt-6">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              className="bg-black border-green-400 text-green-400 placeholder:text-green-700"
              aria-label="Your email address"
            />
          </div>
        )
      case 4:
        return (
          <div className="w-full mt-6">
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number (optional)"
              className="bg-black border-green-400 text-green-400 placeholder:text-green-700"
              aria-label="Your phone number"
            />
          </div>
        )
      case 5:
        return (
          <div className="w-full  mt-6 text-center">
            <p className="text-green-400 mb-4">Ready to join the community!</p>
            <div className="border border-green-400 rounded p-4 mb-4">
              <p className="text-green-400 text-sm mb-2">Credit Card Information</p>
              <div className="h-8 w-full bg-green-900/30 rounded mb-2"></div>
              <div className="h-8 w-full bg-green-900/30 rounded mb-2"></div>
              <div className="h-8 w-1/2 bg-green-900/30 rounded"></div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const currentImage = characterImages[currentStep] || characterImages[0]

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black p-4">
      {/* Game window container */}
      <div className="border-4 border-green-400 rounded-lg p-6 w-full max-w-md bg-black relative overflow-hidden">
        {/* Step indicator */}
        <div className="absolute top-2 right-2 text-green-400 text-xs font-mono">
          LEVEL {currentStep + 1}/{phrases.length}
        </div>

        {/* Character image */}
        <div className="flex justify-center mb-6 mt-4">
          <div className="relative w-48 h-48 border-4 border-green-400 bg-green-200 rounded-lg overflow-hidden">
            <Image
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              width={currentImage.width}
              height={currentImage.height}
              priority={true}
              className="object-contain"
            />
          </div>
        </div>

        {/* Text box */}
        <div className="border-2 border-green-400 bg-black p-4 rounded-lg min-h-[100px] mb-6">
          <div className="font-mono text-green-400">
            <TypewriterEffect text={phrases[currentStep]} speed={40} onComplete={() => setTypingComplete(true)} />
            <span className={cn("ml-1", showCursor ? "opacity-100" : "opacity-0")}>_</span>
          </div>
        </div>

        {/* Form field */}
        {typingComplete && renderFormField()}

        {/* Navigation buttons */}
        <div className="flex justify-end mt-6">
          {typingComplete && (
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="bg-green-700 hover:bg-green-600 text-black font-mono border-2 border-green-400 disabled:opacity-50"
            >
              {isSubmitting ? "SAVING..." : currentStep === phrases.length - 1 ? "SUBMIT" : "NEXT"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
