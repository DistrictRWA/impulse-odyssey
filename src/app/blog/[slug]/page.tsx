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
  const related = all.filter(p => p.slug !== post.slug && p.categories.some(c => post.categories.includes(c))).slice(0,3)
  const serif = "'Cormorant Garamond', Georgia, serif"
  const ey: React.CSSProperties = { fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase' }

  return (
    <article>
      <div style={{position:'relative', height:'75vh', minHeight:500, background:'#1a1714', overflow:'hidden'}}>
        {post.coverImage && (
          <Image src={post.coverImage} alt={post.title} fill priority sizes="100vw" style={{objectFit:'cover', opacity:0.6}} />
        )}
        <div style={{position:'absolute', inset:0, background:'linear-gradient(to top, #1a1714 0%, rgba(26,23,20,0.1) 60%, transparent 100%)'}} />
        <div style={{position:'absolute', bottom:0, left:0, right:0, maxWidth:900, margin:'0 auto', padding:'0 48px 64px', width:'100%'}}>
          <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:16, fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#6b6560'}}>
            <Link href="/" style={{color:'#6b6560', textDecoration:'none'}}>Home</Link>
            <span>/</span>
            <Link href="/blog" style={{color:'#6b6560', textDecoration:'none'}}>Journal</Link>
            {post.categories[0] && <><span>/</span><Link href={`/blog?category=${encodeURIComponent(post.categories[0])}`} style={{color:'#6b6560', textDecoration:'none'}}>{post.categories[0]}</Link></>}
          </div>
          <div style={{display:'flex', gap:12, marginBottom:20, flexWrap:'wrap'}}>
            {post.categories.map(c=>(
              <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`} style={{...ey, color:'#e88', textDecoration:'none'}}>{c}</Link>
            ))}
          </div>
          <h1 style={{fontFamily:serif, fontSize:'clamp(2rem,5vw,4rem)', fontWeight:300, color:'#fff', lineHeight:1.15, marginBottom:20}}>
            {post.title}
          </h1>
          <p style={{fontSize:'0.8rem', color:'#8a8480'}}>By <span style={{color:'#c8bfb0'}}>Alex</span> · {formatDate(post.date)}</p>
        </div>
      </div>

      <div style={{background:'#fff'}}>
        <div style={{maxWidth:720, margin:'0 auto', padding:'72px 32px'}}>
          <div style={{width:40, height:2, background:'#c8392b', marginBottom:48}} />
          <div className="prose-travel" dangerouslySetInnerHTML={{__html: post.content}} />
        </div>
      </div>

      <div style={{background:'#f0ebe0', borderTop:'1px solid #ddd6c8'}}>
        <div style={{maxWidth:900, margin:'0 auto', padding:'48px 32px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:32}}>
          {prev && (
            <Link href={`/blog/${prev.slug}`} style={{textDecoration:'none'}}>
              <p style={{...ey, color:'#9a9490', marginBottom:8}}>← Previous</p>
              <p style={{fontFamily:serif, fontSize:'1.2rem', fontWeight:400, color:'#1a1714', lineHeight:1.3}}>{prev.title}</p>
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} style={{textDecoration:'none', textAlign:'right', gridColumn: prev ? 'auto' : '2'}}>
              <p style={{...ey, color:'#9a9490', marginBottom:8}}>Next →</p>
              <p style={{fontFamily:serif, fontSize:'1.2rem', fontWeight:400, color:'#1a1714', lineHeight:1.3}}>{next.title}</p>
            </Link>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div style={{maxWidth:1280, margin:'0 auto', padding:'64px'}}>
          <div style={{display:'flex', alignItems:'center', gap:16, marginBottom:40}}>
            <p style={{...ey, color:'#c8392b'}}>Related Stories</p>
            <div style={{flex:1, height:1, background:'#ddd6c8'}} />
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:24}}>
            {related.map(p=>(
              <Link key={p.slug} href={`/blog/${p.slug}`} className="hover-card"
                style={{background:'#fff', borderRadius:4, overflow:'hidden', textDecoration:'none'}}>
                <div style={{position:'relative', height:180, background:'#c8bfb0'}}>
                  {p.coverImage && <Image src={p.coverImage} alt={p.title} fill sizes="33vw" style={{objectFit:'cover'}} />}
                </div>
                <div style={{padding:20}}>
                  <p style={{fontSize:'0.6rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'#c8392b', marginBottom:8}}>{p.categories[0]}</p>
                  <p style={{fontFamily:serif, fontSize:'1.1rem', fontWeight:400, color:'#1a1714', lineHeight:1.35}}>{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{textAlign:'center', padding:'48px', borderTop:'1px solid #e8e2d9'}}>
        <Link href="/blog" style={{display:'inline-block', border:'1px solid #1a1714', color:'#1a1714', fontWeight:600, fontSize:'0.7rem', letterSpacing:'0.12em', textTransform:'uppercase', padding:'14px 40px', textDecoration:'none'}}>
          ← Back to Journal
        </Link>
      </div>
    </article>
  )
}
