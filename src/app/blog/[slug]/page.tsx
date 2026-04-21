import { getAllPosts, getPostBySlug, formatDate } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Impulse Odyssey`,
    description: post.excerpt?.replace(/<[^>]+>/g, '').slice(0, 160) || post.content.replace(/<[^>]+>/g, '').slice(0, 160),
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug)
  const prev = allPosts[currentIndex + 1]
  const next = allPosts[currentIndex - 1]

  return (
    <article className="max-w-2xl mx-auto px-6 py-14">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 uppercase tracking-wide">
        <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-red-500 transition-colors">Blog</Link>
        {post.categories[0] && (
          <>
            <span>/</span>
            <Link href={`/blog?category=${encodeURIComponent(post.categories[0])}`}
              className="hover:text-red-500 transition-colors">{post.categories[0]}</Link>
          </>
        )}
      </div>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map(c => (
            <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`}
              className="text-xs bg-red-500 text-white px-3 py-1 rounded-full font-semibold hover:bg-red-600 transition-colors">
              {c}
            </Link>
          ))}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-gray-400 text-sm">
          By <span className="text-gray-600 font-medium">Alex</span> · {formatDate(post.date)}
        </p>
      </header>

      <div className="w-16 h-1 bg-red-500 rounded mb-10" />

      {/* Content */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Nav between posts */}
      <div className="border-t border-gray-100 mt-16 pt-10 grid grid-cols-2 gap-6">
        {prev && (
          <Link href={`/blog/${prev.slug}`} className="group">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">← Previous</p>
            <p className="font-serif font-bold text-gray-900 group-hover:text-red-500 transition-colors text-sm leading-snug">
              {prev.title}
            </p>
          </Link>
        )}
        {next && (
          <Link href={`/blog/${next.slug}`} className="group text-right col-start-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Next →</p>
            <p className="font-serif font-bold text-gray-900 group-hover:text-red-500 transition-colors text-sm leading-snug">
              {next.title}
            </p>
          </Link>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link href="/blog" className="inline-block border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-8 py-3 rounded-full transition-all text-sm">
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}
