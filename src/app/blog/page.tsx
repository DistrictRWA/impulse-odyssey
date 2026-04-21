import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAllCategories, formatDate, getExcerpt } from '@/lib/posts'

export default function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const active = searchParams.category || ''
  const posts = active ? allPosts.filter(p => p.categories.includes(active)) : allPosts
  const [hero, ...rest] = posts
  const serif = "'Cormorant Garamond', Georgia, serif"
  const ey: React.CSSProperties = { fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase' }

  return (
    <div style={{background:'#f9f6f0', minHeight:'100vh'}}>
      <div style={{background:'#fff', borderBottom:'1px solid #e8e2d9', padding:'72px 0 48px', textAlign:'center'}}>
        <p style={{...ey, color:'#c8392b', marginBottom:16}}>{active || 'The Journal'}</p>
        <h1 style={{fontFamily:serif, fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:300, color:'#1a1714'}}>{active || 'All Stories'}</h1>
        <p style={{fontSize:'0.8rem', color:'#9a9490', marginTop:12}}>{posts.length} stories</p>
      </div>

      <div style={{background:'#fff', borderBottom:'1px solid #e8e2d9', position:'sticky', top:56, zIndex:30, overflowX:'auto'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'8px 64px', display:'flex', gap:4}}>
          {[{label:'All', val:''}, ...categories.map(c=>({label:c, val:c}))].map(({label, val})=>(
            <Link key={label} href={val ? `/blog?category=${encodeURIComponent(val)}` : '/blog'}
              style={{whiteSpace:'nowrap', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', padding:'8px 16px', textDecoration:'none', background: active===val ? '#1a1714' : 'transparent', color: active===val ? '#fff' : '#6b6560'}}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1280, margin:'0 auto', padding:'64px'}}>
        {hero && (
          <Link href={`/blog/${hero.slug}`} style={{display:'block', marginBottom:56, textDecoration:'none'}}>
            <div style={{position:'relative', height:'60vh', minHeight:400, background:'#1a1714', borderRadius:4, overflow:'hidden'}}>
              {hero.coverImage && <Image src={hero.coverImage} alt={hero.title} fill priority sizes="100vw" style={{objectFit:'cover', opacity:0.65}} />}
              <div style={{position:'absolute', inset:0, background:'linear-gradient(to top, rgba(26,23,20,0.92) 0%, transparent 55%)'}} />
              <div style={{position:'absolute', bottom:0, left:0, right:0, padding:48}}>
                <p style={{...ey, color:'#e88', marginBottom:12}}>{hero.categories[0]}</p>
                <h2 style={{fontFamily:serif, fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:300, color:'#fff', lineHeight:1.15, maxWidth:800, marginBottom:12}}>{hero.title}</h2>
                <p style={{fontSize:'0.8rem', color:'#8a8480'}}>{formatDate(hero.date)} · By Alex</p>
              </div>
            </div>
          </Link>
        )}

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:24}}>
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="hover-card"
              style={{background:'#fff', borderRadius:4, overflow:'hidden', textDecoration:'none', display:'flex', flexDirection:'column'}}>
              <div style={{position:'relative', height:220, background:'#c8bfb0', overflow:'hidden'}}>
                {post.coverImage
                  ? <Image src={post.coverImage} alt={post.title} fill sizes="33vw" style={{objectFit:'cover'}} />
                  : <div style={{width:'100%', height:'100%', background:'#c8bfb0'}} />}
              </div>
              <div style={{padding:24, display:'flex', flexDirection:'column', flex:1}}>
                <p style={{fontSize:'0.6rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'#c8392b', marginBottom:8}}>{post.categories[0]||'Travel'}</p>
                <h2 style={{fontFamily:serif, fontSize:'1.25rem', fontWeight:400, color:'#1a1714', lineHeight:1.35, marginBottom:10, flex:1}}>{post.title}</h2>
                <p style={{fontSize:'0.8rem', color:'#8a8480', lineHeight:1.6, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', marginBottom:12}}>{getExcerpt(post,110)}</p>
                <p style={{fontSize:'0.7rem', color:'#b0a89e'}}>{formatDate(post.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
