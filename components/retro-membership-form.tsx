"use client"


import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import TypewriterEffect from "@/components/typewriter-effect"
import dynamic from "next/dynamic"
const PongGame = dynamic(() => import("./PongGame"), { ssr: false })
import { submitFormData } from "@/actions/form-actions"
import { toast } from "@/components/ui/use-toast"
import CountdownAnimation from "@/components/Countdown"
//import TVShutdownAnimation from "@/components/TVShutdownAnimation"
//import PriceOptions from "@/components/price-options"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram, faSquareThreads } from '@fortawesome/free-brands-svg-icons';
import StripePayButton from '@/components/StripePayButton';

// import SquarePaymentForm from "@/components/SquarePaymentForm";

// Dynamic import for client-only component
// const SquarePaymentForm = dynamic(() => import('@/components/SquarePaymentForm'), {
//   ssr: false,
// });

const characterImages = [
  { src: "/images/bigfarl1.jpg", alt: "Step 1", width: 400, height: 400 },
  { src: "/images/bigfarl2.jpg", alt: "Step 2", width: 400, height: 400 },
  { src: "/images/bigfarl3.jpg", alt: "Step 3", width: 400, height: 400 },
  { src: "/images/bigfarl4.jpg", alt: "Step 4", width: 400, height: 400 },
  { src: "/images/bigfarl5.jpg", alt: "Step 5", width: 400, height: 400 },
  { src: "/images/bigfarl6.jpg", alt: "Step 6", width: 400, height: 400 },
]


const phrases = [
  'Hey my name is Big Farl. What\'s your name?',
  "Nice to meet you! Where did you see me? Threads or Instagram?",
  "Enter your username",
  "Would you like to enter into a chance to win free merch? Add your email",
  "What's your phone number?",
  "Let's get play",
]


export default function RetroMembershipForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    reference: "",
    username: "",
    email: "",
    phone: "",
    package: "",
  })
  const [typingComplete, setTypingComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLetsStart, setShowLetsStart] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const [countdownValue, setCountdownValue] = useState(3)
  const [showGame, setShowGame] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [openOption, setOpenOption] = useState<null | 'A' | 'B'>(null);





  const handleSquareRedirect = async (amount: number, label: string) => {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, label }),
      });

      const data = await res.json();

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl; // 🔁 Redirects to Square Checkout
      } else {
        alert("❌ Failed to create checkout session: " + data.error);
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }
  };




  const router = useRouter()


  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])



  // handlePackage('consultation');


  const handlePackage = (packageData) => {
    setFormData((prev) => ({ ...prev, ['package']: packageData }))

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handlereferenceSelect = (reference: string) => {
    setFormData((prev) => ({ ...prev, reference }))
  }

  const handlePackageSelect = (pkg: string) => {
    setFormData((prev) => ({ ...prev, package: pkg }))
  }



  const handleLetsStart = () => {
    setShowLetsStart(false)
    setShowCountdown(true)
    let count = 3
    setCountdownValue(count)

    const countdownInterval = setInterval(() => {
      count--
      if (count > 0) {
        setCountdownValue(count)
      } else {
        clearInterval(countdownInterval)
        setCountdownValue(0)

        // ⏳ Wait 1 second before showing game after "Play!"
        setTimeout(() => {
          setShowCountdown(false)
          setShowGame(true)
        }, 1000)
      }
    }, 1000)
  }


  const handleCountdownComplete = () => {
    setShowCountdown(false)
    setCurrentStep(5)
    setTypingComplete(false)
  }





  const handleNext = async () => {
    if (currentStep === 0 && !formData.name) return;
    if (currentStep === 1 && !formData.reference) return;
    if (currentStep === 2 && !formData.username) return;
    if (currentStep === 3 && !formData.email) return;

    // ✅ Phone number required at step 5
    if (currentStep === 4) {
      if (!formData.phone.trim()) {
        setPhoneError('Phone number is required.');
        return;
      } else {
        setPhoneError('');
      }

      setShowLetsStart(true);
      return;
    }

    if (currentStep < phrases.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setTypingComplete(false);
    } else {
      dataStore();
    }
  };

  const dataStore = async () => {
    try {
      setIsSubmitting(true);
      const result = await submitFormData(formData);

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your membership application has been submitted.",
        });
        router.push(`/success?id=${result.id}`);
      } else {
        toast({
          title: "Error",
          description: "There was a problem submitting your application.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const [selectedPackage, setSelectedPackage] = useState("");


  const renderFormField = () => {
    switch (currentStep) {
      case 0:
        return (
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="bg-black border-green-400 text-green-400 placeholder:text-green-700 mt-6 w-full"
          />
        )

        const handlePackageSelect = (selectedPackage: string) => {
          setFormData((prev) => ({ ...prev, package: selectedPackage }))
        }

      case 1:
        return (
          <div className="flex gap-2 mt-6">
            <Button
              type="button"
              variant={formData.reference === "instagram" ? "default" : "outline"}
              className={cn("border-green-400 text-green-400", formData.reference === "instagram" && "bg-green-900")}
              onClick={() => handlereferenceSelect("instagram")}
            >
              <FontAwesomeIcon icon={faSquareInstagram} className="mr-2" />
              Instagram
            </Button>

            <Button
              type="button"
              variant={formData.reference === "threads" ? "default" : "outline"}
              className={cn("border-green-400 text-green-400", formData.reference === "threads" && "bg-green-900")}
              onClick={() => handlereferenceSelect("threads")}
            >
              <FontAwesomeIcon icon={faSquareThreads} className="mr-2" />
              Threads
            </Button>
          </div>
        );

      case 2:
        return (
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={`Your ${formData.reference} username`}
            className="bg-black border-green-400 text-green-400 placeholder:text-green-700 mt-6 w-full"
          />
        )
      case 3:
        return (
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className="bg-black border-green-400 text-green-400 placeholder:text-green-700 mt-6 w-full"
          />
        )
      case 4:
        return (
          <div className="w-full">
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                handleChange(e);
                if (e.target.value.trim()) {
                  setPhoneError('');
                }
              }}
              placeholder="Your phone number (Required)"
              className="bg-black border-green-400 text-green-400 placeholder:text-green-700 mt-6 w-full"
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>
        );

      case 5:
        return (
          <div className="mt-6 text-green-400 text-sm">
            <b className="mb-2 text-center text-green-800 ">Choose your package below to proceed to payment:</b>
            <br />

            <div className="border border-green-400 rounded p-4 space-y-4 bg-black">
              {/* Option A */}
              <div className="border border-green-500 rounded-md">
                <div
                  className="cursor-pointer px-4 py-2 bg-green-900 hover:bg-green-700 font-bold"
                  onClick={() => setOpenOption(openOption === 'A' ? null : 'A')}
                >
                  Option A
                </div>
                {openOption === 'A' && (
                  <div className="p-4 space-y-2">
                    <button
                      onClick={() => {
                        setSelectedPackage('consultation');
                        handlePackage('consultation');
                      }}
                      className="block w-full text-left border border-green-400 p-2 hover:bg-green-800"
                    >
                      $100 for Consultation
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPackage('feature');
                        handlePackage('feature');
                      }}
                      className={
                        (selectedPackage === 'consultation' || selectedPackage === 'feature'
                          ? "block"
                          : "hidden") +
                        " w-full text-left border border-green-400 p-2 hover:bg-green-800 " +
                        (selectedPackage === 'feature' ? " bg-green-700 text-white" : "")
                      }
                    >
                      $1K for Feature ($100 discount)
                    </button>
                  </div>
                )}
              </div>

              {/* Option B */}
              <div className="border border-green-500 rounded-md">
                <div
                  className="cursor-pointer px-4 py-2 bg-green-900 hover:bg-green-700 font-bold"
                  onClick={() => setOpenOption(openOption === 'B' ? null : 'B')}
                >
                  Option B
                </div>
                {openOption === 'B' && (
                  <div className="p-4 space-y-2">
                    <button
                      onClick={() => {
                        // handlePackageSelect("Rookie");
                        // redirectToCheckout("Rookie", 2000);
                        setSelectedPackage('rookie');
                        handlePackage('rookie');
                      }}
                      className="block w-full text-left border border-green-400 p-2 hover:bg-green-800"
                    >
                      $2K Rookie Media Production
                    </button>
                    <button
                      onClick={() => {
                        // handlePackageSelect("Pro");
                        // redirectToCheckout("Pro", 20000);
                        setSelectedPackage('pro');
                        handlePackage('pro');
                      }}
                      className="block w-full text-left border border-green-400 p-2 hover:bg-green-800"
                    >
                      $20K Pro Media Production
                    </button>
                    <button
                      onClick={() => {
                        // handlePackageSelect("Superstar");
                        // redirectToCheckout("Superstar", 70000);
                        setSelectedPackage('superstar');
                        handlePackage('superstar');
                      }}
                      className="block w-full text-left border border-green-400 p-2 hover:bg-green-800"
                    >
                      $70K Superstar Media Production
                    </button>
                  </div>
                )}
              </div>
            </div>
            <br />
            <br />
            <StripePayButton onClick={() => {
              dataStore();
            }} packageType={selectedPackage} />
            {/* <StripePayButton packageType="pro" /> */}

          </div>
        );



      default:
        return null
    }
  }


  const currentImage = characterImages[currentStep] || characterImages[0]
  const redirectToCheckout = async (packageName: string, amount: number) => {
    try {
      const response = await fetch("/api/create-square-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageName, amount }),
      })

      const data = await response.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        toast({
          title: "Error",
          description: "Could not redirect to payment page.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong with payment.",
        variant: "destructive",
      })
    }
  }



  if (showCountdown) {
    return <CountdownAnimation onComplete={handleCountdownComplete} />
  }



  return (
    <div className="flex flex-col items-center justify-center w-full  bg-black p-4">

      <div className=" rounded-lg p-6 w-full max-w-md bg-black relative overflow-hidden">
        {/* 🟩 Show only PongGame when showGame is true */}
        {showGame ? (
          <PongGame
            onGameEnd={() => {
              setShowGame(false)
              setCurrentStep(5) // move to next step after game
              setTypingComplete(false)
            }}
          />
        ) : showCountdown ? (
          // 🟨 Only show countdown inside the border (not fullscreen)
          <div className="text-4xl text-green-400 text-center font-mono w-full animate-pulse h-[300px] flex items-center justify-center">
            {countdownValue > 0 ? countdownValue : "Play!"}
          </div>
        ) : (
          <>

            {/* 🟢 Normal flow content */}
            <div className="absolute top-2 right-2 text-green-400 text-xs font-mono">
              LEVEL {currentStep + 1}/{phrases.length}
            </div>
            {/* <div className="main-action-area">
              <div className="flex justify-center mb-6 mt-4">
                <div className="relative w-48 h-48 border-4 border-green-400 bg-green-200 rounded-lg overflow-hidden">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={currentImage.width}
                    height={currentImage.height}
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="border-2 border-green-400 bg-black p-4 rounded-lg min-h-[100px] mb-6">
                <div className="font-mono text-green-400">
                  <TypewriterEffect text={phrases[currentStep]} speed={40} onComplete={() => setTypingComplete(true)} />
                  <span className={cn("ml-1", showCursor ? "opacity-100" : "opacity-0")}>_</span>
                </div>
              </div>


              {typingComplete && renderFormField()}
            </div> */}

            <div className="main-action-area">
              <div className="slider-wrapper">
                <div key={currentStep} className="slider-content fade-slide-in">
                  <div className="flex justify-center mb-6 mt-4">
                    <div className="relative w-48 h-48 border-4 border-green-400 bg-green-200 rounded-lg overflow-hidden">
                      <Image
                        src={currentImage.src}
                        alt={currentImage.alt}
                        width={currentImage.width}
                        height={currentImage.height}
                        priority
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="border-2 border-green-400 bg-black p-4 rounded-lg min-h-[100px] mb-6">
                    <div className="font-mono text-green-400">
                      <TypewriterEffect text={phrases[currentStep]} speed={40} onComplete={() => setTypingComplete(true)} />
                      <span className={cn("ml-1", showCursor ? "opacity-100" : "opacity-0")}>_</span>
                    </div>
                  </div>

                  {typingComplete && renderFormField()}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              {typingComplete && !showLetsStart && (
                <Button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={"bg-green-700 hover:bg-green-600 text-black font-mono border-2 border-green-400 disabled:opacity-50 " + (currentStep > 4 ? 'hidden ' : 'block')}
                  currentStep={currentStep}

                >
                  {isSubmitting ? "SAVING..." : currentStep === phrases.length - 1 ? "SUBMIT" : "NEXT"}
                </Button>
              )}

              {showLetsStart && (
                <Button
                  onClick={handleLetsStart}
                  className="bg-green-600 hover:bg-green-500 text-black font-mono border-2 border-green-400"
                >
                  Let's Play!!
                </Button>
              )}
            </div>

          </>
        )}
      </div>

    </div>
  )

}



