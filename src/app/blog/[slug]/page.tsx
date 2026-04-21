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
  return { title: `${post.title} — Impulse Odyssey`, description: getExcerpt(post, 160) }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const all = getAllPosts()
  const idx = all.findIndex(p => p.slug === post.slug)
  const prev = all[idx + 1]
  const next = all[idx - 1]
  const related = all.filter(p => p.slug !== post.slug && p.categories.some(c => post.categories.includes(c))).slice(0, 3)

  return (
    <article>
      {/* Hero */}
      <div className="relative bg-stone-900" style={{height: '75vh', minHeight: 500}}>
        {post.coverImage
          ? <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" style={{opacity:.6}} sizes="100vw" />
          : <div className="absolute inset-0 bg-stone-800" />}
        <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(26,23,20,1) 0%, rgba(26,23,20,0.2) 60%, transparent 100%)'}} />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 pb-16 w-full">
          <div className="flex items-center gap-3 mb-5 text-xs text-stone-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Journal</Link>
            {post.categories[0] && (
              <><span>/</span>
              <Link href={`/blog?category=${encodeURIComponent(post.categories[0])}`} className="hover:text-white transition-colors">
                {post.categories[0]}
              </Link></>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {post.categories.map(c => (
              <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`}
                className="eyebrow text-red-400 hover:text-red-300 transition-colors">{c}</Link>
            ))}
          </div>
          <h1 className="serif text-5xl md:text-6xl font-light text-white leading-tight mb-5" style={{letterSpacing:'-0.01em'}}>
            {post.title}
          </h1>
          <p className="text-stone-400 text-sm">By <span className="text-stone-200">Alex</span> · {formatDate(post.date)}</p>
        </div>
      </div>

      {/* Article body */}
      <div className="bg-white">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="w-10 h-px bg-red-600 mb-12" />
          <div className="prose-travel" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>

      {/* Prev / Next */}
      <div className="border-t border-stone-200" style={{background:'#f5f0e8'}}>
        <div className="max-w-3xl mx-auto px-6 py-12 grid grid-cols-2 gap-8">
          {prev && (
            <Link href={`/blog/${prev.slug}`} className="group">
              <p className="eyebrow text-stone-400 mb-2">← Previous</p>
              <p className="serif text-xl font-light text-stone-900 group-hover:text-red-700 transition-colors leading-snug">{prev.title}</p>
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="group text-right col-start-2">
              <p className="eyebrow text-stone-400 mb-2">Next →</p>
              <p className="serif text-xl font-light text-stone-900 group-hover:text-red-700 transition-colors leading-snug">{next.title}</p>
            </Link>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <p className="eyebrow">Related Stories</p>
            <div className="flex-1 h-px bg-stone-200" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card group block">
                <div className="relative h-44 zoom-wrap bg-stone-200">
                  {p.coverImage
                    ? <Image src={p.coverImage} alt={p.title} fill className="object-cover" sizes="33vw" />
                    : <div className="w-full h-full bg-stone-300" />}
                </div>
                <div className="p-5">
                  <p className="eyebrow mb-2">{p.categories[0]}</p>
                  <p className="serif text-lg font-light text-stone-900 group-hover:text-red-700 transition-colors leading-snug">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="text-center py-12 border-t border-stone-100">
        <Link href="/blog" className="inline-block border border-stone-800 text-stone-800 font-semibold text-xs uppercase tracking-widest px-10 py-4 hover:bg-stone-800 hover:text-white transition-colors">
          ← Back to Journal
        </Link>
      </div>
    </article>
  )
}
