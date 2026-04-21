import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAllCategories, formatDate, getExcerpt } from '@/lib/posts'

export default function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const active = searchParams.category || ''
  const posts = active ? allPosts.filter(p => p.categories.includes(active)) : allPosts
  const [hero, ...rest] = posts

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-20 text-center border-b border-stone-200 bg-white">
        <p className="eyebrow mb-4">{active || 'The Journal'}</p>
        <h1 className="serif text-6xl font-light" style={{color:'#1a1714'}}>
          {active || 'All Stories'}
        </h1>
        <p className="text-stone-400 text-sm mt-4 tracking-wide">{posts.length} stories</p>
      </div>

      {/* Category nav */}
      <div className="bg-white border-b border-stone-100 sticky top-14 z-30 overflow-x-auto">
        <div className="max-w-screen-xl mx-auto px-8 py-3 flex gap-2">
          <Link href="/blog"
            className={`shrink-0 text-xs uppercase tracking-widest font-semibold px-4 py-2 transition-colors ${!active ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-red-600'}`}>
            All
          </Link>
          {categories.map(c => (
            <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`}
              className={`shrink-0 text-xs uppercase tracking-widest font-semibold px-4 py-2 whitespace-nowrap transition-colors ${active === c ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-red-600'}`}>
              {c}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 py-14">
        {/* Hero post */}
        {hero && (
          <Link href={`/blog/${hero.slug}`} className="group block mb-14">
            <div className="relative rounded-sm overflow-hidden zoom-wrap bg-stone-200" style={{height: '60vh', minHeight: 400}}>
              {hero.coverImage
                ? <Image src={hero.coverImage} alt={hero.title} fill className="object-cover" style={{opacity:.75}} priority sizes="100vw" />
                : <div className="w-full h-full bg-stone-300" />}
              <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(26,23,20,0.9) 0%, transparent 55%)'}} />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <p className="eyebrow text-red-400 mb-3">{hero.categories[0]}</p>
                <h2 className="serif text-5xl font-light text-white leading-tight max-w-3xl group-hover:text-stone-200 transition-colors mb-3">
                  {hero.title}
                </h2>
                <p className="text-stone-400 text-sm">{formatDate(hero.date)} · By Alex</p>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-7">
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card group block">
              <div className="relative h-56 zoom-wrap bg-stone-200">
                {post.coverImage
                  ? <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="33vw" />
                  : <div className="w-full h-full bg-stone-300" />}
              </div>
              <div className="p-5">
                <p className="eyebrow mb-2">{post.categories[0] || 'Travel'}</p>
                <h2 className="serif text-xl font-light text-stone-900 group-hover:text-red-700 transition-colors leading-snug mb-3">
                  {post.title}
                </h2>
                <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">{getExcerpt(post, 110)}</p>
                <p className="text-xs text-stone-400 mt-3">{formatDate(post.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
