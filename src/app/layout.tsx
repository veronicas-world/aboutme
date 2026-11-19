import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "@/components/Nav";
import ThemeToggle from "@/components/ThemeToggle";

// Runs before first paint so a saved dark theme never flashes light.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="page">
          <Nav />
          {children}
          <footer className="site-footer">
            <span>New York</span>
            <span>Columbia University</span>
            <span>©Veronica Agudelo, {new Date().getFullYear()}</span>
            <ThemeToggle />
          </footer>
          <div className="cloud-band" aria-hidden="true" />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
