'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl text-white font-bold tracking-wider">Charpu</Link>
        <nav className="flex gap-8">
          <Link href="/#films" className="text-sm hover:text-purple-400 transition">Work</Link>
          <Link href="/#about" className="text-sm hover:text-purple-400 transition">About</Link>
          <Link href="/#contact" className="text-sm hover:text-purple-400 transition">Contact</Link>
        </nav>
      </div>
    </header> 
  )
}
