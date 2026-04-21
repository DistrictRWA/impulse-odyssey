import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, formatDate, getExcerpt } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()
  const hero = posts[0]
  const featured = posts.slice(1, 4)
  const recent = posts.slice(4, 10)
  const categories = ['Travel Guides', 'Africa', 'Europe', 'Asia', 'North America', 'South America', 'Oceania', 'Travel Tips']

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-gray-900">
        {hero.coverImage && (
          <Image
            src={hero.coverImage}
            alt={hero.title}
            fill
            priority
            className="object-cover opacity-60"
            unoptimized
          />
        )}
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent" />

        {/* Stats bar */}
        <div className="absolute top-10 right-10 hidden md:flex gap-8 text-white/80 text-right">
          {[['54', 'Countries'], ['6', 'Continents'], ['72', 'Stories']].map(([n, l]) => (
            <div key={l}>
              <div className="font-serif text-3xl font-bold text-white">{n}</div>
              <div className="text-xs uppercase tracking-widest mt-1">{l}</div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-4">Latest Story</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {hero.categories.slice(0, 2).map(c => (
              <span key={c} className="cat-pill">{c}</span>
            ))}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl mb-6">
            {hero.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-8 leading-relaxed">
            {getExcerpt(hero, 180)}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/blog/${hero.slug}`}
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 text-sm uppercase tracking-wider">
              Read Story →
            </Link>
            <span className="text-gray-400 text-sm">{formatDate(hero.date)}</span>
          </div>
        </div>
      </section>

      {/* ── CATEGORY PILLS ───────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-5 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex gap-3">
          <Link href="/blog" className="shrink-0 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-red-500 transition-colors">
            All Posts
          </Link>
          {categories.map(cat => (
            <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
              className="shrink-0 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full border border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500 transition-colors whitespace-nowrap">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED 3-GRID ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Around the World</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900">Recent Adventures</h2>
          </div>
          <Link href="/blog" className="hidden md:inline-block text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider">
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col">
              <div className="relative h-56 img-zoom bg-gray-900">
                {post.coverImage ? (
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {post.categories.slice(0, 1).map(c => (
                    <span key={c} className="cat-pill">{c}</span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{formatDate(post.date)}</p>
                <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-red-500 transition-colors leading-snug mb-3 flex-1">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{getExcerpt(post, 120)}</p>
                <div className="mt-4 flex items-center gap-1 text-red-500 text-xs font-bold uppercase tracking-wide group-hover:gap-2 transition-all">
                  Read More <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── MAGAZINE STRIP ───────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Keep Exploring</p>
              <h2 className="font-serif text-4xl font-bold text-gray-900">More Stories</h2>
            </div>
            <Link href="/blog" className="hidden md:inline-block text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider">
              All {posts.length} posts →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {recent.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group flex gap-5 p-4 rounded-2xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200">
                <div className="relative w-28 h-24 rounded-xl overflow-hidden flex-shrink-0 img-zoom bg-gray-200">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200 flex items-center justify-center text-3xl">✈️</div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex gap-2 mb-2">
                    {post.categories.slice(0, 1).map(c => (
                      <span key={c} className="text-xs text-red-500 font-bold uppercase tracking-wide">{c}</span>
                    ))}
                  </div>
                  <h3 className="font-serif font-bold text-gray-900 group-hover:text-red-500 transition-colors leading-snug text-base">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(post.date)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog"
              className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold px-10 py-4 rounded-full transition-all text-sm uppercase tracking-wider">
              Explore All Adventures →
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUOTE BANNER ─────────────────────────────────────── */}
      <section className="bg-red-500 py-20 text-center px-6">
        <p className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto italic">
          "Life is only limited by the opportunities you decide not to take."
        </p>
        <p className="text-red-200 mt-4 text-sm uppercase tracking-widest font-semibold">— Impulse Odyssey</p>
      </section>
    </div>
  )
}
