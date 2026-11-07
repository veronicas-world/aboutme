import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const pixel = Silkscreen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Veronica Agudelo",
  description: "Veronica Agudelo",
  openGraph: {
    title: "Veronica Agudelo",
    description: "Veronica Agudelo",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pixel.variable}>
      <body>
        <div className="page">
          <Nav />
          {children}
          <div className="cloud-band" aria-hidden="true" />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
