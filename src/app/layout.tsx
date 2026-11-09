import type { Metadata } from "next";
import localFont from "next/font/local";
import { Shell } from "@/components/shell";
import "./globals.css";
import "./design-system.css";
const inter = localFont({
  src: "./fonts/Inter-variable.ttf",
  variable: "--font-inter",
  weight: "400 600",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
const manrope = localFont({
  src: "./fonts/Manrope-variable.ttf",
  variable: "--font-manrope",
  weight: "600 800",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
export const metadata: Metadata = {
  title: {
    default: "Assessment Futures, Designing assessment in the age of AI",
    template: "%s · Assessment Futures",
  },
  description:
    "Research informed assessment possibilities for higher education. An interactive, independent research prototype in the KI-Tutorien Bayern context.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('af-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.dataset.theme='dark'}catch(e){}",
          }}
        />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
