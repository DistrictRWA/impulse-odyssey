import Link from 'next/link'
import { CardLink } from '@/components/CardLink'
import Image from 'next/image'
import { getAllPosts, formatDate, getExcerpt } from '@/lib/posts'

const S = {
  page: { background: '#f9f6f0', minHeight: '100vh' },
  hero: { position: 'relative' as const, height: '90vh', minHeight: 580, background: '#1a1714', overflow: 'hidden' },
  heroOverlay: { position: 'absolute' as const, inset: 0, background: 'linear-gradient(to top, rgba(26,23,20,0.95) 0%, rgba(26,23,20,0.15) 65%, transparent 100%)' },
  heroContent: { position: 'absolute' as const, bottom: 0, left: 0, right: 0, padding: '0 64px 72px', maxWidth: 1280, margin: '0 auto' },
  eyebrow: { fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const },
  heroTitle: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: 900 },
  heroBtn: { display: 'inline-block', background: '#fff', color: '#1a1714', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, padding: '14px 32px', textDecoration: 'none', transition: 'all 0.2s' },
  section: { maxWidth: 1280, margin: '0 auto', padding: '72px 64px' },
  sectionAlt: { background: '#f0ebe0', padding: '72px 0' },
  sectionAltInner: { maxWidth: 1280, margin: '0 auto', padding: '0 64px' },
  divider: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 },
  dividerLine: { flex: 1, height: 1, background: '#ddd6c8' },
  dividerText: { fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#c8392b' },
  card: { background: '#fff', borderRadius: 4, overflow: 'hidden', transition: 'box-shadow 0.3s, transform 0.3s', cursor: 'pointer', textDecoration: 'none', display: 'block' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 24 },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 },
  cardImg: { position: 'relative' as const, height: 280, background: '#ccc4b8', overflow: 'hidden' },
  cardImgSm: { position: 'relative' as const, height: 220, background: '#ccc4b8', overflow: 'hidden' },
  cardBody: { padding: '24px' },
  cardEye: { fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#c8392b', marginBottom: 8 },
  cardTitle: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', fontWeight: 400, color: '#1a1714', lineHeight: 1.3, marginBottom: 12 },
  cardTitleSm: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.2rem', fontWeight: 400, color: '#1a1714', lineHeight: 1.3, marginBottom: 8 },
  cardExcerpt: { fontSize: '0.85rem', color: '#6b6560', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' },
  cardDate: { fontSize: '0.7rem', color: '#9a9490', marginTop: 12 },
  imgOverlay: { position: 'absolute' as const, inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' },
  quote: { background: '#1a1714', padding: '96px 64px', textAlign: 'center' as const },
  quoteText: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 300, fontStyle: 'italic', color: '#f9f6f0', lineHeight: 1.3, maxWidth: 900, margin: '0 auto' },
  catRow: { display: 'flex', flexWrap: 'wrap' as const, gap: 10, marginTop: 32 },
  catBtn: { fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, padding: '10px 20px', border: '1px solid #c8b99a', color: '#6b6560', textDecoration: 'none', transition: 'all 0.2s' },
  viewAll: { display: 'block', textAlign: 'center' as const, marginTop: 48 },
  viewAllBtn: { display: 'inline-block', border: '1px solid #1a1714', color: '#1a1714', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, padding: '14px 40px', textDecoration: 'none' },
}

export default function HomePage() {
  const posts = getAllPosts()
  const [hero, second, third, ...rest] = posts
  const featured = [second, third].filter(Boolean)
  const grid = rest.slice(0, 6)

  return (
    <div style={S.page}>
      {/* HERO */}
      <section style={S.hero}>
        {hero?.coverImage && (
          <Image src={hero.coverImage} alt={hero.title} fill priority sizes="100vw"
            style={{objectFit:'cover', opacity:0.55}} />
        )}
        <div style={S.heroOverlay} />
        {/* Stats */}
        <div style={{position:'absolute', top:80, right:64, display:'flex', flexDirection:'column', gap:20, textAlign:'right'}}>
          {[['54','Countries'],['6','Continents'],['72','Stories']].map(([n,l])=>(
            <div key={l}>
              <div className="serif" style={{fontSize:'2.8rem', fontWeight:300, color:'#fff'}}>{n}</div>
              <div style={{...S.eyebrow, color:'#8a8480', marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={S.heroContent}>
          <p style={{...S.eyebrow, color:'#e88', marginBottom:16}}>Latest Story</p>
          <h1 style={S.heroTitle}>{hero?.title}</h1>
          <div style={{display:'flex', alignItems:'center', gap:24}}>
            <Link href={`/blog/${hero?.slug}`} style={S.heroBtn}>Read Story</Link>
            <span style={{color:'#8a8480', fontSize:'0.85rem'}}>{hero && formatDate(hero.date)}</span>
            {hero?.categories.slice(0,2).map(c=>(
              <span key={c} style={{fontSize:'0.7rem', color:'#8a8480', textTransform:'uppercase', letterSpacing:'0.1em'}}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED 2-COL */}
      <div style={S.section}>
        <div style={S.divider}>
          <span style={S.dividerText}>Recent Adventures</span>
          <div style={S.dividerLine} />
          <Link href="/blog" style={{...S.eyebrow, color:'#9a9490', textDecoration:'none'}}>All Posts →</Link>
        </div>
        <div style={S.grid2}>
          {featured.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="hover-card" style={S.card}>
              <div style={S.cardImg} className="zoom-wrap">
                {post.coverImage
                  ? <Image src={post.coverImage} alt={post.title} fill sizes="50vw" style={{objectFit:'cover'}} />
                  : <div style={{width:'100%',height:'100%',background:'#c8bfb0'}} />}
                <div style={S.imgOverlay} />
                <div style={{position:'absolute', bottom:12, left:16}}>
                  <span style={{...S.cardEye, color:'#ffb3a7'}}>{post.categories[0]}</span>
                </div>
              </div>
              <div style={S.cardBody}>
                <p style={S.cardDate}>{formatDate(post.date)}</p>
                <h2 style={S.cardTitle}>{post.title}</h2>
                <p style={S.cardExcerpt}>{getExcerpt(post, 130)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div style={S.sectionAlt}>
        <div style={S.sectionAltInner}>
          <div style={S.divider}>
            <span style={S.dividerText}>More Stories</span>
            <div style={S.dividerLine} />
          </div>
          <div style={S.grid3}>
            {grid.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="hover-card" style={S.card}>
                <div style={S.cardImgSm} className="zoom-wrap">
                  {post.coverImage
                    ? <Image src={post.coverImage} alt={post.title} fill sizes="33vw" style={{objectFit:'cover'}} />
                    : <div style={{width:'100%',height:'100%',background:'#c8bfb0'}} />}
                </div>
                <div style={S.cardBody}>
                  <p style={S.cardEye}>{post.categories[0] || 'Travel'}</p>
                  <h3 style={S.cardTitleSm}>{post.title}</h3>
                  <p style={S.cardDate}>{formatDate(post.date)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={S.viewAll}>
            <Link href="/blog" style={S.viewAllBtn}>View All {posts.length} Posts</Link>
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <div style={S.quote}>
        <p style={S.quoteText}>"Life is only limited by the opportunities you decide not to take."</p>
        <div style={{width:40, height:1, background:'#c8392b', margin:'32px auto 0'}} />
        <p style={{...S.eyebrow, color:'#4a4540', marginTop:12}}>Impulse Odyssey</p>
      </div>

      {/* DESTINATIONS */}
      <div style={S.section}>
        <div style={S.divider}>
          <span style={S.dividerText}>Explore by Destination</span>
          <div style={S.dividerLine} />
        </div>
        <div style={S.catRow}>
          {['Africa','Asia','Europe','North America','South America','Oceania','Travel Guides','Travel Tips','Featured'].map(cat=>(
            <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`} style={S.catBtn}>{cat}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
