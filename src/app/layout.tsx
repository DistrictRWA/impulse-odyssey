import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impulse Odyssey — Spontaneous Global Adventure',
  description: 'Award-winning travel blog covering adventure, eco, and luxury travel across 54 countries and 6 continents.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="font-serif text-xl font-bold text-gray-900 group-hover:text-red-500 transition-colors">
                Impulse Odyssey
              </span>
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors uppercase tracking-wider">
                Home
              </Link>
              <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors uppercase tracking-wider">
                Blog
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors uppercase tracking-wider">
                About
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-950 text-gray-400 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-serif text-white text-lg font-bold">Impulse Odyssey</p>
                <p className="text-sm mt-1">Spontaneous Global Adventure</p>
              </div>
              <div className="flex gap-6 text-sm">
                <Link href="/blog" className="hover:text-red-400 transition-colors">Blog</Link>
                <Link href="/about" className="hover:text-red-400 transition-colors">About</Link>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-600">
              © Impulse Odyssey {new Date().getFullYear()} · All Rights Reserved
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
