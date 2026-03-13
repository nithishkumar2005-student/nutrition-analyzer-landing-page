import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hill Calories AI - Instant Meal Nutrition Analysis",
  description:
    "Snap a photo of your meal and get instant macronutrient breakdown. Protein, carbs, fat—all in seconds with AI-powered nutrition analysis.",
  generator: "v0.app",
  keywords: "nutrition, meal analysis, macronutrients, food tracking, AI nutrition, protein carbs fat",
  authors: [{ name: "Hill Calories" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Hill Calories AI - Instant Meal Nutrition Analysis",
    description: "Snap a photo of your meal and get instant macronutrient breakdown.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hill Calories AI - Instant Meal Nutrition Analysis",
    description: "Snap a photo of your meal and get instant macronutrient breakdown.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#10B981",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
