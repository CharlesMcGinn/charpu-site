'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FilmCardModal from '@/components/film-card-modal'
import type { Film } from '@/lib/sanity'

export default function SideFilmsPage() {
  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/sanity/content?type=side-films')
        const data = await response.json()
        setFilms(data)
      } catch (error) {
        console.error('Failed to fetch films:', error)
        setFilms([])
      }
      setLoading(false)
    }

    fetchFilms()
  }, [])

  const selectedFilm = films.find(f => f._id === selectedFilmId)
  const selectedIndex = films.findIndex(f => f._id === selectedFilmId)

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedFilmId(films[selectedIndex - 1].id)
    }
  }

  const handleNext = () => {
    if (selectedIndex < films.length - 1) {
      setSelectedFilmId(films[selectedIndex + 1].id)
    }
  }

  return (
    <>
      <Header />
      
      <main className="bg-black">
        {/* Page Banner */}
        <div
          className="w-full h-48 md:h-64 relative"
          style={{
            backgroundImage: 'url(/banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex items-end p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Side Films</h1>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center text-gray-400">Loading films...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {films.map((film) => (
                  <div
                    key={film._id}
                    className="aspect-video relative overflow-hidden cursor-pointer group"
                    onMouseEnter={() => setHoveredId(film._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedFilmId(film._id)}
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
                            <p className="text-xs">{film.categories?.join(' ') || 'Film'}</p>
                          </div>
                        </div>

                        {/* Learn More button in bottom left */}
                        <button className="absolute bottom-6 left-6 text-purple-400 hover:text-purple-300 transition text-sm font-semibold">
                          Learn More
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Film Card Modal */}
      {selectedFilm && (
        <FilmCardModal
          film={selectedFilm}
          onClose={() => setSelectedFilmId(null)}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={selectedIndex > 0}
          hasNext={selectedIndex < films.length - 1}
        />
      )}

      <Footer />
    </>
  )
}
