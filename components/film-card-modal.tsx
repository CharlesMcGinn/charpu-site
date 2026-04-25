"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import type { Film } from "@/lib/sanity"
import { extractYouTubeId } from "@/lib/utils"

interface FilmCardProps {
  film: Film
  onClose: () => void
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
}

export default function FilmCardModal({
  film,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: FilmCardProps) {
  const [showVideo, setShowVideo] = useState(false)
  const [posterViewerIndex, setPosterViewerIndex] = useState<number | null>(null)
  const embedId = extractYouTubeId(film.videoUrl || '')

  const openPosterViewer = (index: number) => setPosterViewerIndex(index)
  const closePosterViewer = () => setPosterViewerIndex(null)
  const posterCount = film.posterImages?.length ?? 0
  const hasPreviousPoster = posterViewerIndex !== null && posterViewerIndex > 0
  const hasNextPoster = posterViewerIndex !== null && posterViewerIndex < posterCount - 1

  const showPosterAt = (index: number) => {
    if (index >= 0 && index < posterCount) {
      setPosterViewerIndex(index)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 md:p-8 pt-[10vh]">
      <div className="relative w-full max-w-2xl lg:w-[90vw] lg:max-w-[90vw] bg-black rounded-lg overflow-visible max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-purple-400 transition z-30 cursor-pointer"
        >
          <X size={28} />
        </button>

        {/* Navigation Arrows - Desktop Only (moved outside card) */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="hidden lg:flex absolute left-[-3rem] top-1/2 transform -translate-y-1/2 text-white hover:text-purple-400 transition z-20 items-center justify-center w-10 h-10 cursor-pointer"
          >
            <ChevronLeft size={32} />
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="hidden lg:flex absolute right-[-3rem] top-1/2 transform -translate-y-1/2 text-white hover:text-purple-400 transition z-20 items-center justify-center w-10 h-10 cursor-pointer"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Banner - Full Width at Top */}
        <div className="relative flex-shrink-0 w-full">
          <img
            src={film.bannerImage || '/hellen-banner-image.jpg'}
            alt={film.title}
            className="w-full h-40 md:h-56 lg:h-72 object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
        </div>

        {/* Two Column Layout - Below Banner */}
        <div className="flex flex-col lg:flex-row w-full flex-1 overflow-hidden">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto">
            <div className="p-6 md:p-8 space-y-6">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white">{film.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <span>{film.duration}</span>
                  <span>•</span>
                  <span>{film.year}</span>
                </div>
                <div className="text-white/70 text-sm flex items-center gap-2">
                  <span className="font-medium">{film.role}</span>
                  <span>•</span>
                  <span>{film.categories?.join(', ')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                {film.videoUrl && (
                  <button onClick={() => setShowVideo(true)} className="cursor-pointer flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 md:px-8 rounded transition">
                    <Play size={20} fill="currentColor" />
                    {film.watchText || 'Play'}
                  </button>
                )}

                {film.learnMoreUrl && (
                  <a href={film.learnMoreUrl} target="_blank" rel="noreferrer" className="cursor-pointer border border-white/30 hover:border-purple-400 text-white font-bold py-3 px-6 md:px-8 rounded transition inline-flex items-center">
                    {film.learnMoreText || 'Learn More'}
                  </a>
                )}
              </div>

              {/* Posters Section */}
              {film.posterImages && film.posterImages.length > 0 && (
                <div className="mt-8 md:mt-12">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4">Posters</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {film.posterImages?.map((poster, idx) => (
                      <img
                        key={idx}
                        src={poster}
                        alt={`Poster ${idx + 1}`}
                        onClick={() => openPosterViewer(idx)}
                        className="cursor-pointer h-32 md:h-40 object-cover rounded flex-shrink-0 transition-opacity hover:opacity-90"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Synopsis */}
          <div className="w-full lg:w-1/2 flex flex-col border-t lg:border-t-0 lg:border-l border-white/10">
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 lg:mb-6">Synopsis</h3>
              <p className="text-white/80 leading-relaxed text-sm whitespace-pre-wrap">
                {film.synopsis}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Overlay */}
      {showVideo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90">
          <div className="relative w-full max-w-4xl p-4">
            <button onClick={() => setShowVideo(false)} className="absolute -top-12 right-0 text-white hover:text-purple-400 transition">
              <X size={32} />
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${embedId || '-tJW8ZgyYIM'}`}
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

      {/* Poster Viewer Overlay */}
      {posterViewerIndex !== null && film.posterImages?.[posterViewerIndex] && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/95 p-4">
          <button onClick={closePosterViewer} className="absolute top-4 right-4 text-white hover:text-purple-400 transition z-30">
            <X size={32} />
          </button>

          {hasPreviousPoster && (
            <button
              onClick={() => showPosterAt((posterViewerIndex ?? 0) - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-400 transition z-30"
            >
              <ChevronLeft size={36} />
            </button>
          )}
          {hasNextPoster && (
            <button
              onClick={() => showPosterAt((posterViewerIndex ?? 0) + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-400 transition z-30"
            >
              <ChevronRight size={36} />
            </button>
          )}

          <img
            src={film.posterImages[posterViewerIndex]}
            alt={`Poster ${posterViewerIndex + 1}`}
            className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  )
}
