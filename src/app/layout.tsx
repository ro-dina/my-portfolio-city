import type { Metadata, Viewport } from "next";
import Header from "@/components/common/Header";
import BackToTopButton from "@/components/common/BackToTopButton";
import Footer from "@/components/common/Footer";
import { LanguageProvider } from "@/components/common/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Isao — Software, AI & Learning",
    template: "%s — Isao",
  },
  description: "ソフトウェア、AI、画像処理、コンピュータサイエンス、語学の制作と学習記録。",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="bg-white text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-100">
        <LanguageProvider>
          <a href="#main-content" className="skip-link">本文へスキップ</a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <BackToTopButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
