import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import WebhookListener from "@/components/webhook-listener"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Parent Whisperer",
  description: "Your supportive companion on the parenting journey",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col bg-cream-50">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
            <WebhookListener />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'