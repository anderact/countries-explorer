import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import { ApolloWrapper } from "@/lib/apollo-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Countries explorer",
  description: "A user friendly country explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloWrapper>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 bg-blue-100">
              {children}
            </main>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
