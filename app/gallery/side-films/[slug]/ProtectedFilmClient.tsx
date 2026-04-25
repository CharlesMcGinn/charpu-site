// Client for password protected side films

'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { getSideFilmBySlug, type Film } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { extractYouTubeId } from '@/lib/utils'
import { ChevronLeft, Play } from 'lucide-react'


export default function ProtectedFilmClient({ film, slug }: any) {
  const [password, setPassword] = useState('')
  //const [authorized, setAuthorized] = useState(!film.password)
  const [authorized, setAuthorized] = useState(
    !(film.password && film.password.trim().length > 0)
  )
  const [unlockedFilm, setUnlockedFilm] = useState(film)
  
    console.log('password:', film.password, typeof film.password)
    console.log(film)

  const handleUnlock = async () => {
    const res = await fetch('/api/film/protected', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, password }),
    })

    const data = await res.json()

    if (res.ok) {
      setUnlockedFilm(data.film)
      setAuthorized(true)
    } else {
      alert('Incorrect password')
      setPassword('')
    }
  }

  function renderPortableText(block: any) { 
    if (!block || !block._type) return null

    switch (block._type) {
        case 'block': {
            const text = (block.children || []).map((child: any) => child.text).join('')

            const alignClass = {
                left: 'text-left',
                center: 'text-center',
                right: 'text-right',
            }[block.style] || 'text-left'

            if (block.style === 'h1') {
                return <h1 key={block._key} className={`text-4xl font-bold mt-12 mb-6 ${alignClass}`}>{text}</h1>
            }

            if (block.style === 'h2') {
                return <h2 key={block._key} className={`text-3xl font-semibold mt-10 mb-5 ${alignClass}`}>{text}</h2>
            }

            if (block.style === 'h3') {
                return <h3 key={block._key} className={`text-2xl font-semibold mt-8 mb-4 ${alignClass}`}>{text}</h3>
            }

            if (block.style === 'center' || block.style === 'left' || block.style === 'right') {
                return (
                <p key={block._key} className={`mb-6 leading-relaxed text-lg text-white/85 ${alignClass}`}>
                    {text}
                </p>
                )
            }

            return (
                <p key={block._key} className="mb-6 leading-relaxed text-lg text-white/85">
                {text}
                </p>
            )
        }
        case 'dividerBlock': {
            const styleClass =
            block.style === 'thick'
            ? 'border-t-2 border-white/40'
            : 'border-t border-white/20'

        return (
            <hr key={block._key} className={`my-12 ${styleClass}`} />
        )
        }
        case 'imageBlock': {
            const src =
            typeof block.image === 'string'
            ? block.image
            : block.image?.asset?.url

        if (!src) return null

        console.log('BLOCK:', block)

        return (
            <div key={block._key} className="my-10">
            <img
                src={src}
                alt={block.caption || 'Image'}
                className="w-full rounded-xl object-cover"
            />
            {block.caption && (
                <p className="mt-3 text-sm text-white/60">{block.caption}</p>
            )}
            </div>
        )
        }
        case 'videoBlock':
        return (
            <div key={block._key} className="my-10">
            <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(block.videoUrl || '')}`}
                title={block.title || 'Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                />
            </div>
            {block.caption && <p className="mt-3 text-sm text-white/60">{block.caption}</p>}
            </div>
        )
        case 'quoteBlock':
        return (
            <figure key={block._key} className="my-12 border-l-4 border-purple-500 pl-6 italic text-white/80">
            <blockquote>{block.quote}</blockquote>
            {block.attribution && <figcaption className="mt-4 text-sm text-white/50">— {block.attribution}</figcaption>}
            </figure>
        )
        case 'galleryBlock':
        return (
            <div key={block._key} className="my-10">
            <div className="grid gap-4 md:grid-cols-2">
                {block.images?.map((image: string, idx: number) => (
                <img key={idx} src={image} alt={block.caption || `Gallery image ${idx + 1}`} className="w-full h-60 object-cover rounded-xl" />
                ))}
            </div>
            {block.caption && <p className="mt-3 text-sm text-white/60">{block.caption}</p>}
            </div>
        )
        case 'twoColumnText':
        return (
            <div key={block._key} className="grid gap-10 lg:grid-cols-2 my-10">
            <div>{(block.left || []).map((item: any) => renderPortableText(item))}</div>
            <div>{(block.right || []).map((item: any) => renderPortableText(item))}</div>
            </div>
        )
        default:
        return null
    }
    }


  // If not authorized, show password input
  if (!authorized) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleUnlock()
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col gap-6 text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Guest Area</h1>
            <p className="text-white/60 text-sm">Please enter the password below.</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter password"
            autoFocus
            className="px-4 py-2 bg-black border border-white text-white placeholder-white/40"
          />
          <button onClick={handleUnlock} className="bg-purple-500 hover:bg-purple-600 px-4 py-2 transition">
            Enter
          </button>
        </div>
      </div>
    )
  }

  const videoId = extractYouTubeId(unlockedFilm.videoUrl || '')
  console.log('BANNER:', unlockedFilm.bannerImage, typeof unlockedFilm.bannerImage)
console.log('LOGO:', unlockedFilm.logo, typeof unlockedFilm.logo)
console.log('POSTERS:', unlockedFilm.posterImages)

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={unlockedFilm.bannerImage || '/hellen-banner-image.jpg'}
            alt={unlockedFilm.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 lg:p-16">
            {unlockedFilm.logo && <img src={unlockedFilm.logo} alt={`${unlockedFilm.title} logo`} className="h-14 mb-6 object-contain" />}
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">{unlockedFilm.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                {unlockedFilm.year && <span>{unlockedFilm.year}</span>}
                {unlockedFilm.duration && <span>{unlockedFilm.duration}</span>}
                {unlockedFilm.role && <span>{unlockedFilm.role}</span>}
                {unlockedFilm.categories?.length && <span>{unlockedFilm.categories.join(' • ')}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="max-w-3xl">
              {unlockedFilm.synopsis && <p className="text-lg text-white/80 leading-relaxed">{unlockedFilm.synopsis}</p>}
            </div>
            <div className="flex min-w-[220px] flex-col gap-4 self-start">
              {videoId && (
                <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-purple-400 hover:text-purple-300">
                  <Play size={16} /> {unlockedFilm.watchText || 'Watch Teaser'}
                </a>
              )}
              {unlockedFilm.learnMoreUrl && (
                <a href={unlockedFilm.learnMoreUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-purple-400 hover:text-purple-300">
                  {unlockedFilm.learnMoreText || 'Learn More'}
                </a>
              )}
            </div>
          </div>

          <div className="mt-8 border-t border-white/10" />

          <div className="mt-12 space-y-10">
            {(unlockedFilm.content || []).map((block, index) => (
              <div key={block._key || index}>{renderPortableText(block)}</div>
            ))}
          </div>

          <div className="mt-16">
            <Link href="/gallery/side-films" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
              <ChevronLeft size={18} /> Back to Side Films
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}