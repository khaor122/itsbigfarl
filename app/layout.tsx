// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://bigfarl.com"),
  title: "Big Farl | Retro Membership",
  description: "Join 'Big Farl' exclusive membership with a retro video game experience",
  keywords: ["Big Farl", "Membership", "Retro", "Video Game"],
  authors: [{ name: "Big Farl" }],
  creator: "Big Farl",
  publisher: "Big Farl",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bigfarl.com",
    title: "Big Farl | Retro Membership",
    description: "Join 'Big Farl' exclusive membership with a retro video game experience",
    siteName: "Big Farl",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Big Farl Retro Membership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Farl | Retro Membership",
    description: "Join 'Big Farl' exclusive membership with a retro video game experience",
    creator: "@bigfarl",
    images: ["/images/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `}
        </Script>

        {/* ✅ Square Web Payments SDK (Uncomment if needed) */}
        {/* 
        <Script
          src="https://sandbox.web.squarecdn.com/v1/square.js"
          strategy="beforeInteractive"
        /> 
        */}
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  )
}
