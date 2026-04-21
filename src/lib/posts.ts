import fs from 'fs'
import path from 'path'

export interface Post {
  title: string
  content: string
  excerpt: string
  date: string
  slug: string
  categories: string[]
  thumbnail_id: string | null
}

let _posts: Post[] | null = null

export function getAllPosts(): Post[] {
  if (_posts) return _posts
  const filePath = path.join(process.cwd(), 'src/data/posts.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  _posts = JSON.parse(raw) as Post[]
  // Sort newest first
  _posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return _posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug)
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const cats = new Set<string>()
  posts.forEach(p => p.categories.forEach(c => cats.add(c)))
  return Array.from(cats).sort()
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
