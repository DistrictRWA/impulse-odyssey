import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impulse Odyssey — Spontaneous Global Adventure',
  description: 'Award-winning travel blog. 54 countries, 6 continents.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-stone-200">
          <div className="max-w-screen-xl mx-auto px-8 h-14 flex items-center justify-between">
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/blog" className="eyebrow hover:text-stone-600 transition-colors">Blog</Link>
              <Link href="/about" className="eyebrow hover:text-stone-600 transition-colors">About</Link>
            </nav>
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="serif text-2xl font-bold tracking-tight" style={{color:'#1a1714'}}>
                Impulse Odyssey
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <span className="eyebrow text-stone-400">54 countries · 6 continents</span>
            </div>
          </div>
        </header>

        <main className="pt-14">{children}</main>

        {/* Footer */}
        <footer style={{background:'#1a1714'}} className="text-stone-400 mt-24">
          <div className="max-w-screen-xl mx-auto px-8 py-16">
            <div className="text-center mb-12">
              <p className="serif text-4xl text-white font-light italic mb-3">Impulse Odyssey</p>
              <p className="eyebrow text-stone-500">Spontaneous Global Adventure</p>
            </div>
            <hr className="rule opacity-20 mb-10" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex gap-8">
                {[['/', 'Home'], ['/blog', 'Blog'], ['/about', 'About']].map(([h, l]) => (
                  <Link key={h} href={h} className="eyebrow text-stone-500 hover:text-red-400 transition-colors">{l}</Link>
                ))}
              </div>
              <p className="text-xs text-stone-600">© Impulse Odyssey {new Date().getFullYear()}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
