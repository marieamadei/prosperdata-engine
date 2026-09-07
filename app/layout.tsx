import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProsperData Engine — Decision intelligence per il fundraising",
  description:
    "Il sistema modulare di DataProsper e Kiwi Data Science che trasforma dati, modelli e segnali in priorità operative per il fundraising.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "ProsperData Engine",
    description: "Sei modelli specialistici. Una sola regia operativa per il fundraising.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
