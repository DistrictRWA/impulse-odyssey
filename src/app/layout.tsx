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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="fixed top-0 left-0 right-0 z-50" style={{background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)', borderBottom:'1px solid #e8e2d9'}}>
          <div style={{maxWidth:1280}} className="mx-auto px-8 h-14 flex items-center justify-between">
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/blog" className="eyebrow text-stone-500 hover:text-red-700 transition-colors">Blog</Link>
              <Link href="/about" className="eyebrow text-stone-500 hover:text-red-700 transition-colors">About</Link>
            </nav>
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="serif" style={{fontSize:'1.5rem', fontWeight:600, color:'#1a1714', letterSpacing:'-0.01em'}}>
                Impulse Odyssey
              </span>
            </Link>
            <span className="hidden md:block eyebrow text-stone-400">54 countries · 6 continents</span>
          </div>
        </header>

        <main style={{paddingTop:56}}>{children}</main>

        <footer style={{background:'#1a1714', marginTop:80}}>
          <div style={{maxWidth:1280}} className="mx-auto px-8 py-16">
            <div className="text-center mb-10">
              <p className="serif text-white" style={{fontSize:'2.5rem', fontWeight:300, fontStyle:'italic'}}>Impulse Odyssey</p>
              <p className="eyebrow mt-2" style={{color:'#6b6560'}}>Spontaneous Global Adventure</p>
            </div>
            <div style={{borderTop:'1px solid #2d2926'}} className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex gap-8">
                {[['/', 'Home'], ['/blog', 'Blog'], ['/about', 'About']].map(([h, l]) => (
                  <Link key={h} href={h} className="eyebrow hover:text-red-400 transition-colors" style={{color:'#6b6560'}}>{l}</Link>
                ))}
              </div>
              <p style={{fontSize:'0.7rem', color:'#4a4540'}}>© Impulse Odyssey {new Date().getFullYear()}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
