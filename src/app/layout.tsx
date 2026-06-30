import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Veronica Agudelo",
  description:
    "Veronica Agudelo — investor, writer, and student of complex systems. Essays on philosophy, emerging technology, and early-stage investing.",
  openGraph: {
    title: "Veronica Agudelo",
    description:
      "Investor, writer, and student of complex systems. Essays at Local Maxima.",
    type: "website",
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
        <div className="page">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
