// app/layout.tsx
import "@fontsource/vazirmatn";
import "./globals.css";
import type { Metadata } from "next";
import { RTLProvider } from "./lib/theme";

export const metadata: Metadata = {
  title: "فرم پروفایل",
  description: "فرم با استفاده از React Hook Form و Zod",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazir antialiased">
        <RTLProvider>{children}</RTLProvider>
      </body>
    </html>
  );
}
