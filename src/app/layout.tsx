import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/theme-provider"
import Providers from '@/lib/providers'
import { Toaster } from '@/shared/components/ui/toast'

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "coop",
  description: "",
};

const roobert = localFont({
  src: "../fonts/RoobertTRIALVF-BF67243fd545701.ttf",
  variable: "--font-roobert",
  weight: "100 900",
  style: "normal",
});

const ppNeueMontreal = localFont({
  src: [
    {
      path: "../fonts/ppneuemontreal-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/ppneuemontreal-book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ppneuemontreal-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ppneuemontreal-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pp-neue-montreal",
  style: "normal",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roobert.variable} ${ppNeueMontreal.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Providers>
              {children}
            </Providers>
          </ThemeProvider>
          <Toaster />
      </body>
    </html>
  );
}
