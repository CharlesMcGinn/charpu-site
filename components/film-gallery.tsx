'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Film } from '@/lib/sanity'

export default function FilmGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null)
  const [featuredFilms, setFeaturedFilms] = useState<Film[]>([])
  const [sideFilms, setSideFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true)
      try {
        const [featuredRes, sideRes] = await Promise.all([
          fetch('/api/sanity/content?type=featured-works'),
          fetch('/api/sanity/content?type=side-films-preview'),
        ])

        const [featured, side] = await Promise.all([
          featuredRes.json(),
          sideRes.json(),
        ])

        setFeaturedFilms(featured)
        setSideFilms(side)
      } catch (error) {
        console.error('Failed to fetch films:', error)
        setFeaturedFilms([])
        setSideFilms([])
      }
      setLoading(false)
    }

    fetchFilms()
  }, [])

  const FilmCard = ({ film }: { film: Film }) => (
    <div
      className="aspect-video relative overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHoveredId(film.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => setSelectedFilm(film)}
    >
      <img 
        src={film.bannerImage || '/banner.png'} 
        alt={film.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {/* Hover Overlay */}
      {hoveredId === film.id && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-between p-6">
          {/* Film title in middle */}
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-3xl font-bold text-center">{film.title}</h3>
          </div>
          
          {/* Role and Category closer to bottom */}
          <div className="w-full mb-6">
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-1">Role</p>
              <p className="text-sm">{film.role || 'Director'}</p>
            </div>
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-1">Category</p>
              <p className="text-xs">{film.categories?.join(' ') || 'Short'}</p>
            </div>
          </div>

          {/* Learn More button in bottom left */}
          <button className="absolute bottom-6 left-6 text-purple-400 hover:text-purple-300 transition text-sm font-semibold">
            Learn More
          </button>
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <section className="bg-black py-24 px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          Loading films...
        </div>
      </section>
    )
  }

  return (
    <section id="films" className="bg-black py-24 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Featured Works Section */}
        <div className="mb-24">
          <h2 className="text-sm tracking-widest text-gray-400 mb-12">\ Featured Works</h2>
          <div className="grid grid-cols-1 gap-8 mb-8">
            {featuredFilms.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
          <button 
            onClick={() => window.location.href = '/gallery/featured-works'}
            className="text-purple-400 hover:text-purple-300 transition text-sm font-semibold"
          >
            View More →
          </button>
        </div>

        {/* Side Films Section */}
        <div>
          <h2 className="text-sm tracking-widest text-gray-400 mb-12">\ Side Films</h2>
          <div className="grid grid-cols-1 gap-8 mb-8">
            {sideFilms.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
          <button 
            onClick={() => window.location.href = '/gallery/side-films'}
            className="text-purple-400 hover:text-purple-300 transition text-sm font-semibold"
          >
            View More →
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {selectedFilm && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedFilm(null)}
              className="absolute -top-12 right-0 text-white hover:text-purple-400 transition"
            >
              <X size={32} />
            </button>
            
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedFilm.videoUrl || '-tJW8ZgyYIM'}`}
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
