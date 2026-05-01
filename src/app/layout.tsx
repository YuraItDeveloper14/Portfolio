import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yurii Dmytrenko | Full-Stack Developer",
  description: "Scrollytelling portfolio of Yurii Dmytrenko, Full-Stack Developer. Featuring smooth animations and modern design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-dark-bg text-white overflow-x-hidden selection:bg-purple-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
