import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
/*import { SpeedInsights } from "@vercel/speed-insights/next"*/

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "F&M",
  description: "Discover our fun relationship with food, drinks, and competitions",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

