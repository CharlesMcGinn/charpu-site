'use client'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wider">Charpu</div>
        <nav className="flex gap-8">
          <a href="#about" className="text-sm hover:text-purple-400 transition">About</a>
          <a href="#films" className="text-sm hover:text-purple-400 transition">Film</a>
          <a href="#contact" className="text-sm hover:text-purple-400 transition">Contact</a>
          <a href="#layers" className="text-sm hover:text-purple-400 transition">Layers</a>
          <a href="#instagram" className="text-sm hover:text-purple-400 transition">Instagram</a>
          <a href="#youtube" className="text-sm hover:text-purple-400 transition">Youtube</a>
        </nav>
      </div>
    </header>
  )
}
