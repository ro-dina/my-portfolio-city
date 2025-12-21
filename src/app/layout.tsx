import Header from '@/components/common/Header'
import './globals.css'
import { LanguageProvider } from '@/components/common/LanguageProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <Header />
          <main className="pt-16">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}