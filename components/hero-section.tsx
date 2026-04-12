'use client'

import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end p-12 pb-24">
        {/* Name and Roles - Bottom Left */}
        <div>
          <h1 className="text-7xl md:text-8xl font-bold tracking-wider mb-8 text-white">
            Carlos Fernandez<br />Puertolas
          </h1>
          <div className="flex gap-16">
            <p className="text-base tracking-wide">Director</p>
            <p className="text-base tracking-wide">Cinematographer</p>
          </div>
        </div>
        
        {/* Scroll Indicator - Bottom Center */}
        <button 
          onClick={() => {
            document.querySelector('#films')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-purple-400 transition"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  )
}
