import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuyBee – Shop Owner Dashboard",
  description: "BuyBee Multi-Shop E-Commerce Marketplace - Shop Owner Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFFCF8] text-[#171717] antialiased">
        {children}
      </body>
    </html>
  );
}
