import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-body" });

export const metadata: Metadata = { title: "SWIFTY — Vêtements organiques haut de gamme", description: "Lin, coton et mailles nobles. Des pièces intemporelles aux teintes de terre." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body className="bg-lin font-body text-encre">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
