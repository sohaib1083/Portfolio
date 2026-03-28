import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sohaib Shamsi — Full-Stack & AI Engineer",
  description:
    "Portfolio of Sohaib Sarosh Shamsi — Full-Stack Developer & AI/ML Engineer building intelligent systems.",
  keywords: [
    "Sohaib Shamsi",
    "AI Engineer",
    "ML Engineer",
    "Full-Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Sohaib Sarosh Shamsi" }],
  openGraph: {
    title: "Sohaib Shamsi — Full-Stack & AI Engineer",
    description:
      "Full-Stack Engineer & AI/ML Specialist crafting intelligent systems.",
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
