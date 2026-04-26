'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect } from 'react'
import Script from "next/script";

export default function HeroSection() {

  // useEffect(() => {
  //   console.log("Fluid at mount:", (window as any).Fluid)
  //   if (typeof window !== 'undefined' && (window as any).Fluid) {
  //     ;(window as any).Fluid.initialize()
  //   }
  // }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Fluid) {
      console.log('Re-initializing Fluid')
      ;(window as any).Fluid.initialize()
    }
  }, [])

 
console.log("Test 1")

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      {/* <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hellen-banner-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      /> */}

      {/* Canvas Background */}
      <canvas
        id="fluid-canvas"
        //className="absolute inset-0 w-full h-full z-20"
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      <Script
        src="/fluid.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Fluid script loaded");
          window.Fluid.initialize();
        }}
      />

      {/* Overlay */}
      <div id="hero-overlay" className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      {/* <div className="relative z-10 w-full h-full flex flex-col justify-end p-12 pb-24"> */}
      {/* <div className="absolute bottom-10 left-12 z-30 pointer-events-none"> */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-12 z-30 pointer-events-none">
        {/* Name and Roles - Bottom Left */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6 sm:mb-8 text-white mix-blend-exclusion leading-tight">
            Carlos Fernandez<br />Puertolas
          </h1>
          <div className="flex gap-16">
            <p className="text-base tracking-wide">Animator</p>
            <p className="text-base tracking-wide">Director</p>
          </div>
        </div>
        
        
      </div>
      {/* Scroll Indicator - Bottom Center */}
        <button 
          onClick={() => {
            document.querySelector('#films')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-purple-400 transition z-30"
        >
          <ChevronDown size={32} />
        </button>
    </section>
  )
}
