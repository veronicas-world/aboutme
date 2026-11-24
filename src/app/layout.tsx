import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./pastel.css";
import "./chrome.css";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

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
    <html lang="en">
      <body>
        <a className="skip-to-navigation" href="#site-navigation">Skip to navigation</a>
        <div className="page">
          <Nav />
          {children}
          <div className="site-ending">
            <SiteFooter />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
