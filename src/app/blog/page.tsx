import Link from 'next/link'
import { getAllPosts, getAllCategories, formatDate } from '@/lib/posts'

export default function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const activeCategory = searchParams.category || ''
  const posts = activeCategory
    ? allPosts.filter(p => p.categories.includes(activeCategory))
    : allPosts

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">The Blog</h1>
        <p className="text-gray-500">{posts.length} stories from around the world</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-12">
        <Link href="/blog"
          className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${!activeCategory ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500'}`}>
          All
        </Link>
        {categories.map(cat => (
          <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
            className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${activeCategory === cat ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500'}`}>
            {cat}
          </Link>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 flex flex-col">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-44 flex items-end p-5">
              <div className="flex flex-wrap gap-2">
                {post.categories.slice(0, 2).map(c => (
                  <span key={c} className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-semibold">{c}</span>
                ))}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{formatDate(post.date)}</p>
              <h2 className="font-serif text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors leading-snug mb-3">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
                {post.excerpt
                  ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 140) + '...'
                  : post.content.replace(/<[^>]+>/g, '').slice(0, 140) + '...'}
              </p>
              <span className="mt-4 text-xs font-semibold text-red-500 uppercase tracking-wide group-hover:underline">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
