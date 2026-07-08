// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RFC Assurance - Société de Courtage d'Assurance et de Conseil en Gestion des Risques",
  description: "Société de Courtage d'Assurance et de Conseil en Gestion des Risques. Audit & Prévention des Risques Industriels - Courtier d'assurance agréé par le Ministère des Finances",
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
      <body 
        className={inter.className}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
