import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAllCategories, formatDate, getExcerpt } from '@/lib/posts'

export default function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const activeCategory = searchParams.category || ''
  const posts = activeCategory ? allPosts.filter(p => p.categories.includes(activeCategory)) : allPosts
  const [heroPost, ...rest] = posts

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-gray-950 text-white py-20 px-6 text-center">
        <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">Impulse Odyssey</p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
          {activeCategory || 'The Blog'}
        </h1>
        <p className="text-gray-400 text-sm">{posts.length} stories from around the world</p>
      </div>

      {/* Category filter */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2">
          <Link href="/blog"
            className={`shrink-0 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full transition-colors ${!activeCategory ? 'bg-red-500 text-white' : 'border border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500'}`}>
            All
          </Link>
          {categories.map(cat => (
            <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
              className={`shrink-0 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-colors whitespace-nowrap ${activeCategory === cat ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500'}`}>
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Hero post */}
        {heroPost && (
          <Link href={`/blog/${heroPost.slug}`} className="group block mb-14">
            <div className="relative h-[55vh] rounded-3xl overflow-hidden img-zoom bg-gray-900">
              {heroPost.coverImage ? (
                <Image src={heroPost.coverImage} alt={heroPost.title} fill className="object-cover opacity-75" unoptimized />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex gap-2 mb-4">
                  {heroPost.categories.slice(0, 2).map(c => (
                    <span key={c} className="cat-pill">{c}</span>
                  ))}
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl group-hover:text-red-300 transition-colors mb-3">
                  {heroPost.title}
                </h2>
                <p className="text-gray-300 text-sm">{formatDate(heroPost.date)} · By Alex</p>
              </div>
            </div>
          </Link>
        )}

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col">
              <div className="relative h-52 img-zoom bg-gray-900">
                {post.coverImage ? (
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  {post.categories.slice(0, 1).map(c => (
                    <span key={c} className="cat-pill">{c}</span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{formatDate(post.date)}</p>
                <h2 className="font-serif text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors leading-snug mb-3 flex-1">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{getExcerpt(post, 110)}</p>
                <div className="mt-4 text-xs font-bold text-red-500 uppercase tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
