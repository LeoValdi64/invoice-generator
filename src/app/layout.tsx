import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvoiceForge - Free Invoice Generator",
  description:
    "Create professional invoices in seconds. Free online invoice generator for freelancers and small businesses. No signup required.",
  keywords: [
    "invoice generator",
    "free invoice",
    "invoice maker",
    "freelance invoice",
    "invoice template",
    "PDF invoice",
  ],
  openGraph: {
    title: "InvoiceForge - Free Invoice Generator",
    description:
      "Create professional invoices in seconds. Free online tool for freelancers and small businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
