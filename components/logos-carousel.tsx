'use client'

import { useEffect, useState } from 'react'
import type { LogoItem } from '@/lib/sanity'

export default function LogosCarousel() {
  const [logos, setLogos] = useState<LogoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogos = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/sanity/content?type=client-logos')
        const data = await response.json()
        setLogos(data)
      } catch (error) {
        console.error('Failed to fetch logos:', error)
        setLogos([])
      }
      setLoading(false)
    }

    fetchLogos()
  }, [])

  if (loading || logos.length === 0) {
    return null
  }

  return (
    <section className="bg-black py-20 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm tracking-widest text-gray-400 mb-16 text-center">\ Selected Clients</h2>
        
        {/* Auto-scrolling carousel */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 items-center justify-center">
            {/* Animated carousel */}
            <div className="flex gap-16 items-center animate-scroll whitespace-nowrap">
              {[...logos, ...logos].map((logo, idx) => (
                <div 
                  key={idx}
                  className="flex-shrink-0 h-20 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img 
                    src={logo.image}
                    alt={logo.name}
                    className="h-full object-contain max-w-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  )
}
