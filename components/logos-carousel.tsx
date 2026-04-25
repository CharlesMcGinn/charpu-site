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
        <h2 className="text-sm tracking-widest text-gray-400 mb-16 text-center">I've worked with...</h2>
        
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center"> */}
        <div className="flex flex-wrap justify-center gap-12">
          {logos.map((logo) => (
            <div
              key={logo._id}
              className="flex items-center justify-center h-20 opacity-80 hover:opacity-100 transition-transform transform hover:scale-105"
            >
              {logo.url ? (
                <a href={logo.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="h-full object-contain max-w-xs"
                  />
                </a>
              ) : (
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-full object-contain max-w-xs"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
