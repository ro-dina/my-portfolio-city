import Header from '@/components/common/Header'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isDark = true;
  return (
    <html lang="ja" className = {isDark ? "dark" : ""}>
      <body>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}