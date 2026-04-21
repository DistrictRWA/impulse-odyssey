import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impulse Odyssey — Spontaneous Global Adventure',
  description: 'Award-winning travel blog. 54 countries, 6 continents — adventure, eco & luxury travel stories.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-xl font-bold tracking-tight text-gray-900 group-hover:text-red-600 transition-colors">
                Impulse<span className="text-red-500">Odyssey</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {[['/', 'Home'], ['/blog', 'Blog'], ['/about', 'About']].map(([href, label]) => (
                <Link key={href} href={href}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest">
                  {label}
                </Link>
              ))}
            </nav>
            <Link href="/blog"
              className="hidden md:inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors">
              Read Now
            </Link>
          </div>
        </header>

        <main className="pt-16">{children}</main>

        <footer className="bg-gray-950 text-gray-400">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-3 gap-10 mb-12">
              <div>
                <p className="font-serif text-white text-2xl font-bold mb-3">ImpulseOdyssey</p>
                <p className="text-sm leading-relaxed text-gray-500">
                  Adventure, eco & luxury travel across 54 countries and 6 continents.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-600 mb-4 font-semibold">Explore</p>
                <div className="flex flex-col gap-2">
                  {[['/', 'Home'], ['/blog', 'All Posts'], ['/about', 'About']].map(([href, label]) => (
                    <Link key={href} href={href} className="text-sm text-gray-400 hover:text-red-400 transition-colors">{label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-600 mb-4 font-semibold">Destinations</p>
                <div className="flex flex-wrap gap-2">
                  {['Africa', 'Asia', 'Europe', 'Americas', 'Oceania'].map(c => (
                    <Link key={c} href={`/blog?category=${c}`}
                      className="text-xs px-3 py-1 rounded-full border border-gray-800 text-gray-500 hover:border-red-500 hover:text-red-400 transition-colors">
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-900 pt-8 text-xs text-center text-gray-700">
              © Impulse Odyssey {new Date().getFullYear()} · All Rights Reserved · Life is only limited by the opportunities you decide not to take.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
