import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
title: "Nutrio AI - Instant Meal Nutrition Analysis",
description:
"Snap a photo of your meal and get instant macronutrient breakdown. Protein, carbs, fat—all in seconds with AI-powered nutrition analysis.",
keywords: "nutrition, meal analysis, macronutrients, food tracking, AI nutrition",
authors: [{ name: "P. Nithishkumar" }],

openGraph: {
title: "Nutrio AI - Instant Meal Nutrition Analysis",
description: "AI-powered meal nutrition analyzer.",
type: "website",
locale: "en_US",
},

twitter: {
card: "summary_large_image",
title: "Nutrio AI",
description: "Instant AI meal nutrition analysis.",
},
}

export const viewport: Viewport = {
width: "device-width",
initialScale: 1,
maximumScale: 5,
userScalable: true,
themeColor: "#00ff9d",
}

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode
}>) {
return ( <html lang="en" className="dark"> <head>

```
    {/* GOOGLE FONT (FOR STITCH UI) */}
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    {/* MATERIAL ICONS */}
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      rel="stylesheet"
    />

  </head>

  <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
    {children}
    <Analytics />
  </body>
</html>
```

)
}

