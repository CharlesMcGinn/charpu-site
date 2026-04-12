'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'

interface FilmCardProps {
  film: {
    id: number
    title: string
    duration: string
    categories: string[]
    year: number
    synopsis: string
    posters: string[]
  }
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
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-2xl lg:w-[90vw] lg:max-w-[90vw] bg-black rounded-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-purple-400 transition z-20"
        >
          <X size={28} />
        </button>

        {/* Navigation Arrows - Desktop Only */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="hidden lg:flex absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-400 transition z-20 items-center justify-center w-10 h-10"
          >
            <ChevronLeft size={32} />
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="hidden lg:flex absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-400 transition z-20 items-center justify-center w-10 h-10"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Banner - Full Width at Top */}
        <div className="relative flex-shrink-0 w-full">
          <img
            src="/banner.png"
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
                <div className="text-white/70 text-sm">
                  {film.categories.join(', ')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 md:px-8 rounded transition">
                  <Play size={20} fill="currentColor" />
                  Play
                </button>
                <button className="border border-white/30 hover:border-purple-400 text-white font-bold py-3 px-6 md:px-8 rounded transition">
                  Play Trailer
                </button>
              </div>

              {/* Posters Section */}
              {film.posters.length > 0 && (
                <div className="mt-8 md:mt-12">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4">Posters</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {film.posters.map((poster, idx) => (
                      <img
                        key={idx}
                        src={poster}
                        alt={`Poster ${idx + 1}`}
                        className="h-32 md:h-40 object-cover rounded flex-shrink-0"
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
              <p className="text-white/80 leading-relaxed text-sm">
                {film.synopsis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
