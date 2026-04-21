import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, formatDate, getExcerpt } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()
  const [hero, second, third, ...rest] = posts
  const featured = [second, third].filter(Boolean)
  const grid = rest.slice(0, 6)

  return (
    <div>
      {/* ─── FULL-BLEED HERO ─────────────────────────── */}
      <section className="relative h-screen max-h-[90vh] min-h-[600px] bg-stone-900">
        {hero?.coverImage && (
          <Image src={hero.coverImage} alt={hero.title} fill priority
            className="object-cover" style={{opacity: 0.55}} sizes="100vw" />
        )}
        {/* Gradient */}
        <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(26,23,20,0.95) 0%, rgba(26,23,20,0.2) 60%, transparent 100%)'}} />

        {/* Top rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-16 max-w-screen-xl mx-auto w-full left-0 right-0">
          <p className="eyebrow text-red-400 mb-4">Latest Story</p>
          <h1 className="serif text-5xl md:text-7xl font-light text-white leading-[1.1] max-w-4xl mb-6" style={{letterSpacing: '-0.01em'}}>
            {hero?.title}
          </h1>
          <div className="flex items-center gap-6">
            <Link href={`/blog/${hero?.slug}`}
              className="inline-block bg-white text-stone-900 font-semibold text-xs uppercase tracking-widest px-7 py-3 hover:bg-red-600 hover:text-white transition-colors">
              Read Story
            </Link>
            <span className="text-stone-400 text-sm">{hero && formatDate(hero.date)}</span>
            <div className="flex gap-2">
              {hero?.categories.slice(0,2).map(c => (
                <span key={c} className="text-xs text-stone-400 uppercase tracking-wider">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats — top right */}
        <div className="absolute top-20 right-8 md:right-16 hidden lg:flex flex-col gap-5 text-right">
          {[['54', 'Countries'], ['6', 'Continents'], ['72', 'Stories']].map(([n, l]) => (
            <div key={l}>
              <div className="serif text-4xl font-light text-white">{n}</div>
              <div className="eyebrow text-stone-400 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TWO-COLUMN SPLIT ────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-8 py-16">
        <div className="flex items-center gap-4 mb-10">
          <p className="eyebrow">Recent Adventures</p>
          <div className="flex-1 h-px bg-stone-200" />
          <Link href="/blog" className="eyebrow text-stone-400 hover:text-red-600 transition-colors">All Posts →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card group block">
              <div className="relative h-72 zoom-wrap bg-stone-200">
                {post.coverImage
                  ? <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width:768px)100vw,50vw" />
                  : <div className="w-full h-full bg-stone-300" />}
                <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)'}} />
                <div className="absolute bottom-4 left-4">
                  <span className="eyebrow text-red-300">{post.categories[0]}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-stone-400 mb-2">{formatDate(post.date)}</p>
                <h2 className="serif text-2xl font-light leading-snug text-stone-900 group-hover:text-red-700 transition-colors mb-3">{post.title}</h2>
                <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">{getExcerpt(post, 130)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── EDITORIAL GRID ─────────────────────────── */}
      <section style={{background:'#f5f0e8'}} className="py-16">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-10">
            <p className="eyebrow">More Stories</p>
            <div className="flex-1 h-px bg-stone-300" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {grid.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card group block">
                <div className="relative h-52 zoom-wrap bg-stone-200">
                  {post.coverImage
                    ? <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="33vw" />
                    : <div className="w-full h-full bg-stone-300" />}
                </div>
                <div className="p-5">
                  <p className="eyebrow mb-2">{post.categories[0]}</p>
                  <h3 className="serif text-xl font-light text-stone-900 group-hover:text-red-700 transition-colors leading-snug mb-2">{post.title}</h3>
                  <p className="text-xs text-stone-400">{formatDate(post.date)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog" className="inline-block border border-stone-800 text-stone-800 font-semibold text-xs uppercase tracking-widest px-10 py-4 hover:bg-stone-800 hover:text-white transition-colors">
              View All {posts.length} Posts
            </Link>
          </div>
        </div>
      </section>

      {/* ─── QUOTE ──────────────────────────────────── */}
      <section className="py-24 px-8 text-center" style={{background:'#1a1714'}}>
        <p className="serif text-4xl md:text-6xl font-light italic text-white leading-tight max-w-4xl mx-auto" style={{color:'#f5f0e8'}}>
          "Life is only limited by the opportunities you decide not to take."
        </p>
        <div className="w-12 h-px bg-red-600 mx-auto mt-8" />
        <p className="eyebrow text-stone-500 mt-4">Impulse Odyssey</p>
      </section>

      {/* ─── DESTINATION CATEGORIES ─────────────────── */}
      <section className="py-16 px-8 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <p className="eyebrow">Explore by Destination</p>
          <div className="flex-1 h-px bg-stone-200" />
        </div>
        <div className="flex flex-wrap gap-3">
          {['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Travel Guides', 'Travel Tips', 'Featured'].map(cat => (
            <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
              className="text-xs uppercase tracking-widest font-semibold px-5 py-2.5 border border-stone-300 text-stone-600 hover:border-red-600 hover:text-red-600 transition-colors">
              {cat}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
