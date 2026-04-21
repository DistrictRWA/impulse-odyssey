import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()
  const featured = posts.slice(0, 3)
  const recent = posts.slice(3, 9)
  const categories = ['Travel Guides', 'Africa', 'Europe', 'Asia', 'North America', 'South America', 'Oceania']

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-950 text-white py-28 px-6 text-center">
        <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-4">Spontaneous Global Adventure</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Impulse Odyssey
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
          Adventure, eco & luxury travel across 54 countries and 6 continents — one journey at a time.
        </p>
        <Link href="/blog" className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full transition-colors">
          Read the Blog
        </Link>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-3 justify-center">
          {categories.map(cat => (
            <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-gray-200 hover:border-red-400 hover:text-red-500 transition-colors text-gray-600">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl font-bold mb-10 text-gray-900">Latest Adventures</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-48 flex items-end p-5">
                <div className="flex flex-wrap gap-2">
                  {post.categories.slice(0, 2).map(c => (
                    <span key={c} className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-semibold">{c}</span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{formatDate(post.date)}</p>
                <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors leading-snug mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                  {post.excerpt || post.content.replace(/<[^>]+>/g, '').slice(0, 120) + '...'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* More Posts */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold mb-10 text-gray-900">More Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group flex gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors">
                <div className="bg-gray-100 rounded-lg w-16 h-16 flex-shrink-0 flex items-center justify-center">
                  <span className="text-2xl">✈️</span>
                </div>
                <div>
                  <div className="flex gap-2 mb-1">
                    {post.categories.slice(0, 1).map(c => (
                      <span key={c} className="text-xs text-red-500 font-semibold uppercase">{c}</span>
                    ))}
                  </div>
                  <h3 className="font-serif font-bold text-gray-900 group-hover:text-red-500 transition-colors text-sm leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(post.date)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="inline-block border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-8 py-3 rounded-full transition-all">
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
