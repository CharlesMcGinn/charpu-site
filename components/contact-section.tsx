'use client'

import { ExternalLink } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="bg-black py-24 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm tracking-widest text-gray-400 mb-16">\ Contact</h2>

        {/* Email */}
        <div className="mb-20">
          <a 
            href="mailto:"
            className="group inline-block"
          >
            <h3 className="text-5xl md:text-6xl font-bold text-white group-hover:text-purple-400 transition-colors mb-4">
              contact@carlos.com
            </h3>
            <div className="flex items-center gap-2 text-white/60 group-hover:text-purple-400 transition-colors">
              <ExternalLink size={20} />
            </div>
          </a>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <a 
            href="https://www.instagram.com/charpu_art/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 pb-6 border-b border-white/10 hover:border-purple-400 transition-colors"
          >
            <span className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">Instagram</span>
            <ExternalLink size={24} className="text-white/60 group-hover:text-purple-400 transition-colors" />
          </a>

          <a 
            href="https://www.linkedin.com/in/carlosfpuertolas/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 pb-6 border-b border-white/10 hover:border-purple-400 transition-colors"
          >
            <span className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">LinkedIn</span>
            <ExternalLink size={24} className="text-white/60 group-hover:text-purple-400 transition-colors" />
          </a>

          <a 
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 pb-6 border-b border-white/10 hover:border-purple-400 transition-colors"
          >
            <span className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">YouTube</span>
            <ExternalLink size={24} className="text-white/60 group-hover:text-purple-400 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  )
}
