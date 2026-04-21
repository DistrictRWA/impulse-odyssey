'use client'
import Link from 'next/link'
import { ReactNode } from 'react'

export function CardLink({ href, children, style }: { href: string; children: ReactNode; style?: React.CSSProperties }) {
  return (
    <Link href={href} style={{...style, transition:'box-shadow 0.3s, transform 0.3s'}}
      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow='0 16px 48px rgba(0,0,0,0.13)';(e.currentTarget as HTMLElement).style.transform='translateY(-4px)'}}
      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';(e.currentTarget as HTMLElement).style.transform='none'}}>
      {children}
    </Link>
  )
}
