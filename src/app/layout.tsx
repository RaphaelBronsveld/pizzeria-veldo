import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pizzaria Veldo",
  description: "For all your pizza-related needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased min-h-screen bg-gradient-to-b from-amber-50 to-amber-100`}
      >
        <Header />
        <main className="container p-4 mx-auto">{children}</main>
      </body>
    </html>
  );
}
