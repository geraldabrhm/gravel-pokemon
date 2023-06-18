import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokemon App',
  description: 'Pokemon App 101',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
          <Header/>
          <main className="min-h-screen w-screen">
            {children}
          </main>
      </body>
    </html>
  )
}
