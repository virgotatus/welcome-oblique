import "./globals.css";
import { i18n, type Locale } from "@/i18n-config";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "灵感炼丹炉",
  description:
    "灵感炼丹炉，来自Brian Eno的灵感策略卡片和赛博灵媒。\
    Oblique Strategies: a set of axioms, transcribed onto cue cards and derived from the Chinese Divination system, the I Ching.",
  icons: { icon: "/image/favicon.png" },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
