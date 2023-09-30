import { Toaster } from "@/components/ui/Toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "oktaaniLINK",
  description: "Share your links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={[inter.className, "h-screen"].join(" ")}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
