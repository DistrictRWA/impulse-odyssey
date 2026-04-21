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
  coverImage: string | null
}

let _posts: Post[] | null = null

export function getAllPosts(): Post[] {
  if (_posts) return _posts
  const filePath = path.join(process.cwd(), 'src/data/posts.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  _posts = JSON.parse(raw) as Post[]
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
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function getExcerpt(post: Post, length = 140): string {
  const text = (post.excerpt || post.content).replace(/<[^>]+>/g, '').trim()
  return text.length > length ? text.slice(0, length) + '...' : text
}
