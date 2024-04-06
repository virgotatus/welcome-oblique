import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "炼丹炉",
  description:
    "灵感炼丹炉，来自Brian Eno的灵感策略卡片和赛博灵媒。\
    Oblique Strategies: a set of axioms, transcribed onto cue cards and derived from the Chinese Divination system, the I Ching.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
