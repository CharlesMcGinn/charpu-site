'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10 py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-sm text-white/60">
          © {currentYear} Carlos Fernandez Puertolas. All rights reserved.
        </div>
        <div className="text-sm text-white/60">
          Built with <span className="text-purple-400">precision</span> and <span className="text-purple-400">intention</span>
        </div>
      </div>
    </footer>
  )
}
