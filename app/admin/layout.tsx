import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "邮伴计划",
  description: "Email Fellowship",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
