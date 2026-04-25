// For routing of password protected films

import { NextRequest, NextResponse } from 'next/server'
import { getSanityContent } from '@/lib/sanity'

export async function POST(req: NextRequest) {
  try {
    const { slug, password } = await req.json()

    // fetch from the correct type
    const film = await getSanityContent(
  `*[_type == "sideFilm" && slug.current == $slug][0] {
    _id,
    title,
    duration,
    categories,
    year,
    "bannerImage": bannerImage.asset->url,
    "logo": logo.asset->url,
    "posterImages": posterImages[].asset->url,
    learnMoreUrl,
    learnMoreText,
    videoUrl,
    watchText,
    synopsis,
    role,
    featured,
    pageType,
    password,
    "slug": slug,
    content[]{..., 
        "image": image.asset->url, 
        "images": images[].asset->url,
        left[]{
            ...,
            "image": image.asset->url
        },
        right[]{
            ...,
            "image": image.asset->url
        }
    }
  }`,
  { slug }
)

    if (!film || (Array.isArray(film) && film.length === 0)) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // public film → no password
    if (!film.password) {
      return NextResponse.json({ film })
    }

    // password check
    if (film.password !== password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
    }

    // success → return film
    return NextResponse.json({ film })
  } catch (err) {
    console.error('ProtectedFilm API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}