import { createClient, type SanityClient } from '@sanity/client'

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const SANITY_API_VERSION = '2024-01-01'

let sanityClient: SanityClient | null = null

if (!SANITY_PROJECT_ID) {
  console.warn('NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity integration will return empty data.')
} else {
  try {
    sanityClient = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true,
    })
  } catch (error) {
    console.error('Failed to initialize Sanity client:', error)
    sanityClient = null
  }
}

export { sanityClient }

export async function getSanityContent(
  query: string,
  params?: Record<string, any>
) {
  if (!sanityClient) {
    console.warn('Sanity client not initialized. Please set NEXT_PUBLIC_SANITY_PROJECT_ID.')
    return []
  }

  try {
    const data = await sanityClient.fetch(query, params)
    return data || []
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return []
  }
}

export async function getLogos() {
  const query = `*[_type == "clientLogo"] | order(_createdAt desc) {
    _id,
    name,
    "image": image.asset->url
  }`
  return getSanityContent(query)
}

export async function getFeaturedWorks() {
  const query = `*[_type == "film" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    duration,
    categories,
    year,
    "bannerImage": bannerImage.asset->url,
    "posterImages": posterImages[].asset->url,
    trailerUrl,
    videoUrl,
    synopsis,
    role
  }`
  return getSanityContent(query)
}

export async function getSideFilms() {
  const query = `*[_type == "film" && featured != true] | order(_createdAt desc) {
    _id,
    title,
    duration,
    categories,
    year,
    "bannerImage": bannerImage.asset->url,
    "posterImages": posterImages[].asset->url,
    trailerUrl,
    videoUrl,
    synopsis,
    role
  }`
  return getSanityContent(query)
}

export async function getFilmById(id: string) {
  const query = `*[_type == "film" && _id == $id][0] {
    _id,
    title,
    duration,
    categories,
    year,
    "bannerImage": bannerImage.asset->url,
    "posterImages": posterImages[].asset->url,
    trailerUrl,
    videoUrl,
    synopsis,
    role
  }`
  return getSanityContent(query, { id })
}

export interface LogoItem {
  _id: string
  name: string
  image: string
}

export interface Film {
  _id: string
  title: string
  duration: string
  categories: string[]
  year: number
  bannerImage: string
  posterImages: string[]
  trailerUrl?: string
  videoUrl?: string
  synopsis: string
  role?: string
}
