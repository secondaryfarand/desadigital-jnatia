import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Desa | Layanan Desa Digital",
  description: "Aplikasi Layanan dan Administrasi Desa Digital",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>
        {/* Panggil Client Layout yang memegang state di sini */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
