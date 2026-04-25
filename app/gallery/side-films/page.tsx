'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FilmCardModal from '@/components/film-card-modal'
import type { Film } from '@/lib/sanity'
import { extractYouTubeId } from '@/lib/utils'
import { X } from 'lucide-react'

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
        setFilms([...data].sort((a: Film, b: Film) => (b.year || 0) - (a.year || 0)))
      } catch (error) {
        console.error('Failed to fetch films:', error)
        setFilms([])
      }
      setLoading(false)
    }

    fetchFilms()
  }, [])

  const router = useRouter()
  const selectedFilm = films.find(f => f._id === selectedFilmId)
  const selectedIndex = films.findIndex(f => f._id === selectedFilmId)
  const [selectedVideoFilm, setSelectedVideoFilm] = useState<Film | null>(null)
  const [infoFilm, setInfoFilm] = useState<Film | null>(null)

  const handleInfoClick = (film: Film) => {
    console.log('handleInfoClick triggered for film:', film)
    console.log('film.slug type:', typeof film.slug, 'value:', film.slug)
    console.log('film.slug.current type:', typeof film.slug?.current, 'value:', film.slug?.current)
    console.log('film.pageType:', film.pageType)
    if (film.pageType === 'projectPage' && film.slug?.current) {
      const targetSlug = typeof film.slug === 'string' ? film.slug : film.slug?.current
      console.log('Navigating to slug:', targetSlug)
      router.push(`/gallery/side-films/${targetSlug}`)
      router.push(`/gallery/side-films/${film.slug.current}`)
      return
    }

    setInfoFilm(film)
  }

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedFilmId(films[selectedIndex - 1]._id)
    }
  }

  const handleNext = () => {
    if (selectedIndex < films.length - 1) {
      setSelectedFilmId(films[selectedIndex + 1]._id)
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
            backgroundImage: 'url(/hellen-banner-image.jpg)',
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
                  <div key={film._id} className="flex flex-col">
                    <div
                      className="aspect-video relative overflow-hidden group cursor-pointer"
                      onMouseEnter={() => setHoveredId(film._id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <img
                        src={film.bannerImage || '/hellen-banner-image.jpg'}
                        alt={film.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Hover Overlay */}
                      {hoveredId === film._id && (
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-between p-6">
                          {/* Buttons in middle */}
                          <div className="flex-1 flex items-center justify-center">
                            <div className="flex gap-4">
                              <button onClick={() => setSelectedVideoFilm(film)} className="cursor-pointer bg-purple-500 text-white py-2 px-4 rounded">Watch</button>
                              <button onClick={() => handleInfoClick(film)} className="cursor-pointer border border-white/30 text-white py-2 px-4 rounded">Info</button>
                            </div>
                          </div>

                          {/* Role and Category side-by-side */}
                          <div className="w-full mb-6 flex items-center justify-between text-xs text-gray-300">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">Role</span>
                              <span className="font-medium">{film.role || 'Director'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">Category</span>
                              <span>{film.categories?.join(' ') || 'Film'}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <h3 className="mt-3 text-lg font-medium text-white text-center">{film.title}</h3>
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

      {/* Video Overlay */}
      {selectedVideoFilm && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedVideoFilm(null)}
              className="absolute -top-12 right-0 text-white hover:text-purple-400 transition"
            >
              <X size={32} />
            </button>

            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractYouTubeId(selectedVideoFilm.videoUrl || '') || '-tJW8ZgyYIM'}`}
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

      {/* Info Modal */}
      {infoFilm && (
        <FilmCardModal film={infoFilm} onClose={() => setInfoFilm(null)} />
      )}

      <Footer />
    </>
  )
}
