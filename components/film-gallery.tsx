'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import type { Film } from '@/lib/sanity'
import FilmCardModal from '@/components/film-card-modal'
import { extractYouTubeId } from '@/lib/utils'

export default function FilmGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null)
  const [featuredFilms, setFeaturedFilms] = useState<Film[]>([])
  const [sideFilms, setSideFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Fetched sideFilms array:', sideFilms)
    sideFilms.forEach(film => {
      console.log('Film slug type:', typeof film.slug, 'value:', film.slug)
    })
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

        setFeaturedFilms([...featured].sort((a: Film, b: Film) => (b.year || 0) - (a.year || 0)))
        setSideFilms([...side].sort((a: Film, b: Film) => (b.year || 0) - (a.year || 0)))
      } catch (error) {
        console.error('Failed to fetch films:', error)
        setFeaturedFilms([])
        setSideFilms([])
      }
      setLoading(false)
    }

    fetchFilms()
  }, [])

  const [infoFilm, setInfoFilm] = useState<Film | null>(null)
  const router = useRouter()

  const handleInfoClick = (film: Film) => {
    if (film.pageType === 'projectPage' && film.slug?.current) {
      router.push(`/gallery/side-films/${film.slug.current}`)
      return
    }

    setInfoFilm(film)
  }

  const FilmCard = ({ film }: { film: Film }) => (
    <div
      className="aspect-video relative overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHoveredId(film._id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => handleInfoClick(film)}
    >
      <img
        src={film.bannerImage || '/hellen-banner-image.jpg'}
        alt={film.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {/* Hover Overlay */}
      {hoveredId === film._id && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-between p-6">
          {/* Title above buttons */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-center">{film.title}</h3>
            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedFilm(film)
                }}
                className="cursor-pointer bg-purple-500 text-white py-2 px-4 rounded"
              >
                Watch
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleInfoClick(film)
                }}
                className="cursor-pointer border border-white/30 text-white py-2 px-4 rounded"
              >
                Info
              </button>
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
              <span>{film.categories?.join(' ') || 'Short'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  if (loading){
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
        {/* Featured Studio Projects Section */}
        <div className="mb-24">
          <h2 className="text-sm tracking-widest text-gray-400 mb-12">Studio Projects</h2>
          <div className="grid grid-cols-1 gap-8 mb-8">
            {featuredFilms.map((film) => (
              <FilmCard key={film._id} film={film} />
            ))}
          </div>
          <button 
            onClick={() => router.push('/gallery/studio-projects')}
            className="text-purple-400 hover:text-purple-300 transition text-sm font-semibold"
          >
            View More →
          </button>
        </div>

        {/* Featured Side Films Section */}
        <div>
          <h2 className="text-sm tracking-widest text-gray-400 mb-12">Side Films</h2>
          <div className="grid grid-cols-1 gap-8 mb-8">
            {sideFilms.map((film) => (
              <FilmCard key={film._id} film={film} />
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
                src={`https://www.youtube.com/embed/${extractYouTubeId(selectedFilm.videoUrl || '') || '-tJW8ZgyYIM'}`}
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
    </section>
  )
}
