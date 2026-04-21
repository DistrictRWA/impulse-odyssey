import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { n: '54', label: 'Countries' },
    { n: '6', label: 'Continents' },
    { n: '72', label: 'Stories' },
    { n: '2017', label: 'Since' },
  ]

  return (
    <div>
      {/* Hero */}
      <div className="bg-gray-950 text-white py-28 px-6 text-center">
        <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-4">The Story</p>
        <h1 className="font-serif text-6xl font-bold mb-6">About</h1>
        <div className="w-12 h-1 bg-red-500 rounded mx-auto" />
      </div>

      {/* Stats */}
      <div className="bg-red-500 py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map(({ n, label }) => (
            <div key={label}>
              <div className="font-serif text-5xl font-bold">{n}</div>
              <div className="text-xs uppercase tracking-widest mt-2 text-red-100">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="space-y-7 text-lg leading-relaxed text-gray-700">
          <p>
            <strong className="text-gray-900 font-semibold">Impulse Odyssey</strong> is an award-winning travel brand showcasing adventure, eco, and luxury travel stories, photography, and videos from around the world.
          </p>
          <p>
            I'm Alex — founder, thrill seeker, and explorer of <strong className="text-red-500">54 countries</strong> across 6 continents. From surviving the Sahara with nomadic Berbers to cage diving with great white sharks in Australia, I live to chase outrageous adventures.
          </p>
          <p>
            Life is only limited by the opportunities you decide not to take. Follow your own Impulse Odyssey.
          </p>
        </div>
        <div className="mt-12">
          <Link href="/blog"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full transition-colors text-sm uppercase tracking-wider">
            Read the Blog →
          </Link>
        </div>
      </div>
    </div>
  )
}
