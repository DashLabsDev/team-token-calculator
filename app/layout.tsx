import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdSlot } from "@/components/AdSlot";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://aitokencalculator.com";

export const metadata: Metadata = {
  title: "AI Token Cost Calculator — Compare LLM Pricing (2025)",
  description:
    "Compare AI token pricing across 25+ models from OpenAI, Anthropic, Google, Meta, DeepSeek, Mistral and more. Calculate LLM costs instantly. Free AI token calculator.",
  keywords: [
    "AI token cost calculator",
    "LLM pricing comparison",
    "GPT token calculator",
    "Claude pricing",
    "Gemini pricing",
    "compare AI models cost",
    "ChatGPT token cost",
    "LLM cost estimator",
    "OpenAI pricing calculator",
    "AI API cost",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Token Cost Calculator — Compare LLM Pricing",
    description:
      "Compare token costs across 25+ AI models. Calculate exactly what you'll pay for GPT-4o, Claude 3.5, Gemini, DeepSeek, and more.",
    url: siteUrl,
    siteName: "AI Token Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Token Cost Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Token Cost Calculator — Compare LLM Pricing",
    description:
      "Instantly compare AI token pricing across GPT-4o, Claude, Gemini, DeepSeek, and 20+ more models.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense — replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "AI Token Cost Calculator",
              description:
                "Compare AI token pricing across 25+ models from OpenAI, Anthropic, Google, Meta, DeepSeek, Mistral and more.",
              url: siteUrl,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "25+ AI model pricing",
                "Side-by-side cost comparison",
                "Token estimation from text",
                "Prompt caching cost calculator",
                "Real-world usage examples",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How much does GPT-4o cost per token?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "GPT-4o costs $2.50 per million input tokens and $10.00 per million output tokens as of 2025. With prompt caching, input tokens cost $1.25/M.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the cheapest AI model?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Gemini 1.5 Flash at $0.075/M input and $0.30/M output is among the cheapest. Mistral Small and GPT-4o Mini are also very affordable at under $0.20/M input tokens.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I calculate AI token costs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Multiply your input token count by the model's input price per million, add the output tokens multiplied by the output price per million. Our calculator does this automatically.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider defaultTheme="system" storageKey="ai-calc-theme">
          {/* Top nav */}
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity">
                <span className="text-lg">⚡</span>
                <span>AI Token Calculator</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#calculator" className="hover:text-foreground transition-colors">Calculator</a>
                <a href="#pricing" className="hover:text-foreground transition-colors">Pricing Table</a>
                <a href="#tips" className="hover:text-foreground transition-colors">Cost Tips</a>
              </nav>
              <ThemeToggle />
            </div>
          </header>

          {/* Top ad banner */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <AdSlot slot="top" />
          </div>

          <main>{children}</main>

          <footer className="border-t border-border mt-16 py-8 text-center text-sm text-muted-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="mb-2 font-medium text-foreground">AI Token Cost Calculator</p>
              <p className="text-xs">
                Prices are approximate and updated regularly. Always verify current pricing on provider websites.
                Not affiliated with OpenAI, Anthropic, Google, or other providers.
              </p>
              <p className="text-xs mt-3">
                © {new Date().getFullYear()} AI Token Calculator. Built for developers.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
