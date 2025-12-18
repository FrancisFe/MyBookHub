import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { QueryProvider } from "@/providers/queryProvider";
import { CartProvider } from "@/context/cartContex";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Books Devlights",
  description: "Sistema de gestión de libros y alquileres",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        <QueryProvider>
          {/* Ya no pasamos el userId desde aquí, 
              el CartProvider lo gestionará internamente */}
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}