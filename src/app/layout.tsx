import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Legacy fonts for /blog and /admin, not preloaded so the home page stays light.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const description =
  "I build the systems money moves through: fraud monitoring, data lakehouses and cross-currency payments, end to end.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: `${profile.name} · ${profile.role}`,
  description,
  authors: [{ name: profile.name, url: profile.site }],
  openGraph: {
    title: `${profile.name} · ${profile.role}`,
    description,
    url: profile.site,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
