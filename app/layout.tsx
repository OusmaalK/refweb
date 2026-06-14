// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RFC Assurance - Courtier d'Assurance en Algérie",
  description: "Consulting en Audit & Prévention des Risques Industriels - Courtage d'assurance agréé par le Ministère des Finances",
  icons: {
    icon: '/static/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" data-scroll-behavior="smooth">

      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}