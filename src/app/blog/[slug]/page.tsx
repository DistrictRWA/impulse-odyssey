import { getAllPosts, getPostBySlug, formatDate, getExcerpt } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Impulse Odyssey`,
    description: getExcerpt(post, 160),
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const idx = allPosts.findIndex(p => p.slug === post.slug)
  const prev = allPosts[idx + 1]
  const next = allPosts[idx - 1]
  const related = allPosts.filter(p => p.slug !== post.slug && p.categories.some(c => post.categories.includes(c))).slice(0, 3)

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[70vh] bg-gray-900 overflow-hidden">
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover opacity-65" unoptimized />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-5 uppercase tracking-wide">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-red-400 transition-colors">Blog</Link>
            {post.categories[0] && (
              <>
                <span>/</span>
                <Link href={`/blog?category=${encodeURIComponent(post.categories[0])}`} className="hover:text-red-400 transition-colors">
                  {post.categories[0]}
                </Link>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {post.categories.map(c => (
              <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`} className="cat-pill hover:bg-red-600 transition-colors">
                {c}
              </Link>
            ))}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-300 text-sm">
            By <span className="text-white font-semibold">Alex</span> · {formatDate(post.date)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="w-12 h-1 bg-red-500 rounded mb-10" />
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>

      {/* Prev / Next */}
      <div className="bg-stone-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-12 grid grid-cols-2 gap-8">
          {prev && (
            <Link href={`/blog/${prev.slug}`} className="group">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">← Previous</p>
              <p className="font-serif font-bold text-gray-900 group-hover:text-red-500 transition-colors leading-snug">{prev.title}</p>
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="group text-right col-start-2">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Next →</p>
              <p className="font-serif font-bold text-gray-900 group-hover:text-red-500 transition-colors leading-snug">{next.title}</p>
            </Link>
          )}
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8">Related Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col">
                <div className="relative h-44 img-zoom bg-gray-900">
                  {p.coverImage ? (
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="font-serif font-bold text-gray-900 group-hover:text-red-500 transition-colors leading-snug">{p.title}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(p.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="text-center py-10 bg-white border-t border-gray-100">
        <Link href="/blog" className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold px-10 py-4 rounded-full transition-all text-sm uppercase tracking-wider">
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}
