import Header from '@/components/common/Header'
import './globals.css'
import { LanguageProvider } from '@/components/common/LanguageProvider';
import { HomeModeProvider } from '@/components/common/HomeModeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <HomeModeProvider>
            <Header />
            <main className="pt-16">{children}</main>
          </HomeModeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
