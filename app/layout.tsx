import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Beam — Pricing page A/B testing that defends its numbers",
  description:
    "Beam splits every visitor across pricing variants, measures revenue instead of clicks, and tells you which price to ship. Statistical rigor, guardrail alerts, zero-flash delivery.",
  keywords: [
    "pricing A/B testing",
    "price experimentation",
    "conversion optimization",
    "SaaS pricing",
    "statistical significance",
  ],
  openGraph: {
    title: "Beam — Pricing page A/B testing",
    description:
      "Ship the price that converts. Beam runs the experiment and tells you which variant wins.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="grain relative min-h-full flex flex-col">{children}</body>
    </html>
  );
}
