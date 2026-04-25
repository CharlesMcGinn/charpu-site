import Header from '@/components/header'
import Footer from '@/components/footer'
import { getSideFilmBySlug, type Film } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { extractYouTubeId } from '@/lib/utils'
import { ChevronLeft, Play } from 'lucide-react'
import ProtectedFilmClient from './ProtectedFilmClient'

interface SideFilmPageProps {
  params: Promise<{ slug: string }> | { slug: string }
}

export default async function SideFilmProjectPage({ params }: SideFilmPageProps) {
  const { slug } = await params

  const film = await getSideFilmBySlug(slug)

  if (!film || film.pageType !== 'projectPage') {
    notFound()
  }

  return <ProtectedFilmClient film={film} slug={slug} />
}

// function renderPortableText(block: any) {
//   if (!block || !block._type) return null

//   switch (block._type) {
//     case 'block':
//       const text = (block.children || []).map((child: any) => child.text).join('')
//       if (block.style === 'h1') {
//         return <h1 key={block._key} className="text-4xl font-bold mt-12 mb-6">{text}</h1>
//       }
//       if (block.style === 'h2') {
//         return <h2 key={block._key} className="text-3xl font-semibold mt-10 mb-5">{text}</h2>
//       }
//       return <p key={block._key} className="mb-6 leading-relaxed text-lg text-white/85">{text}</p>
//     case 'imageBlock':
//       return (
//         <div key={block._key} className="my-10">
//           <img src={block.image} alt={block.caption || 'Image'} className="w-full rounded-xl object-cover" />
//           {block.caption && <p className="mt-3 text-sm text-white/60">{block.caption}</p>}
//         </div>
//       )
//     case 'videoBlock':
//       return (
//         <div key={block._key} className="my-10">
//           <div className="aspect-video rounded-xl overflow-hidden">
//             <iframe
//               src={`https://www.youtube.com/embed/${extractYouTubeId(block.videoUrl || '')}`}
//               title={block.title || 'Video'}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="w-full h-full"
//             />
//           </div>
//           {block.caption && <p className="mt-3 text-sm text-white/60">{block.caption}</p>}
//         </div>
//       )
//     case 'quoteBlock':
//       return (
//         <figure key={block._key} className="my-12 border-l-4 border-purple-500 pl-6 italic text-white/80">
//           <blockquote>{block.quote}</blockquote>
//           {block.attribution && <figcaption className="mt-4 text-sm text-white/50">— {block.attribution}</figcaption>}
//         </figure>
//       )
//     case 'galleryBlock':
//       return (
//         <div key={block._key} className="my-10">
//           <div className="grid gap-4 md:grid-cols-2">
//             {block.images?.map((image: string, idx: number) => (
//               <img key={idx} src={image} alt={block.caption || `Gallery image ${idx + 1}`} className="w-full h-60 object-cover rounded-xl" />
//             ))}
//           </div>
//           {block.caption && <p className="mt-3 text-sm text-white/60">{block.caption}</p>}
//         </div>
//       )
//     case 'twoColumnText':
//       return (
//         <div key={block._key} className="grid gap-10 lg:grid-cols-2 my-10">
//           <div>{(block.left || []).map((item: any) => renderPortableText(item))}</div>
//           <div>{(block.right || []).map((item: any) => renderPortableText(item))}</div>
//         </div>
//       )
//     default:
//       return null
//   }
// }

// export default async function SideFilmProjectPage({ params }: SideFilmPageProps) {
//   const { slug } = await params
//   if (!slug) {
//     notFound()
//   }

//   const film = await getSideFilmBySlug(slug)

//   if (!film || film.pageType !== 'projectPage') {
//     notFound()
//   }

//   const videoId = extractYouTubeId(film.videoUrl || '')

//   return (
//     <>
//       <Header />
//       <main className="bg-black text-white">
//         <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
//           <img
//             src={film.bannerImage || '/hellen-banner-image.jpg'}
//             alt={film.title}
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/60" />
//           <div className="relative z-10 flex h-full flex-col justify-end p-8 lg:p-16">
//             {film.logo && <img src={film.logo} alt={`${film.title} logo`} className="h-14 mb-6 object-contain" />}
//             <div className="max-w-3xl">
//               <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">{film.title}</h1>
//               <div className="flex flex-wrap gap-4 text-sm text-white/70">
//                 {film.year && <span>{film.year}</span>}
//                 {film.duration && <span>{film.duration}</span>}
//                 {film.role && <span>{film.role}</span>}
//                 {film.categories?.length && <span>{film.categories.join(' • ')}</span>}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-6 py-16">
//           <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
//             <div className="max-w-3xl">
//               {film.synopsis && <p className="text-lg text-white/80 leading-relaxed">{film.synopsis}</p>}
//             </div>
//             <div className="flex min-w-[220px] flex-col gap-4 self-start">
//               {videoId && (
//                 <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-purple-400 hover:text-purple-300">
//                   <Play size={16} /> {film.watchText || 'Watch Teaser'}
//                 </a>
//               )}
//               {film.learnMoreUrl && (
//                 <a href={film.learnMoreUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-purple-400 hover:text-purple-300">
//                   {film.learnMoreText || 'Learn More'}
//                 </a>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 border-t border-white/10" />

//           <div className="mt-12 space-y-10">
//             {(film.content || []).map((block, index) => (
//               <div key={block._key || index}>{renderPortableText(block)}</div>
//             ))}
//           </div>

//           <div className="mt-16">
//             <Link href="/gallery/side-films" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
//               <ChevronLeft size={18} /> Back to Side Films
//             </Link>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }
