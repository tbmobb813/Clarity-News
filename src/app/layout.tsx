import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/Header"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "Clarity News - AI-Powered News Aggregator",
  description: "Get unbiased news with AI-powered summaries and bias detection",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
