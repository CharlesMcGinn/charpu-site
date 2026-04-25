// To start website, cd into site and run `npm run dev`
// To push changes to Sanity Studio, cd into studio-charpu and run `npx sanity deploy`
// To start Sanity Studio locally, cd into studio-charpu and run `npm run dev` (you don't need to, you can use Sanity site)

import { createClient, type SanityClient } from '@sanity/client'
import { draftMode } from 'next/headers'

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const SANITY_API_VERSION = '2024-01-01'

// let sanityClient: SanityClient | null = null

// if (!SANITY_PROJECT_ID) {
//   console.warn('NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity integration will return empty data.')
// } else {
//   try {
//     sanityClient = createClient({
//       projectId: SANITY_PROJECT_ID,
//       dataset: SANITY_DATASET,
//       apiVersion: SANITY_API_VERSION,
//       useCdn: true,
//     })
    
//   } catch (error) {
//     console.error('Failed to initialize Sanity client:', error)
//     sanityClient = null
//   }
// }

const baseConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
}

// Published (fast, cached)
const publishedClient = createClient({
  ...baseConfig,
  useCdn: true,
})

// Draft (no cache, needs token)
const previewClient = createClient({
  ...baseConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN, // ← important
})

//export { sanityClient }

// Helper to get the appropriate client based on draft mode
async function getClient() {
  const { isEnabled } = await draftMode()
  return isEnabled ? previewClient : publishedClient
}

// export async function getSanityContent(
//   query: string,
//   params?: Record<string, any>
// ) {
//   if (!sanityClient) {
//     console.warn('Sanity client not initialized. Please set NEXT_PUBLIC_SANITY_PROJECT_ID.')
//     return []
//   }

//   try {
//     const data = await sanityClient.fetch(query, params)
//     return data || []
//   } catch (error) {
//     console.error('Sanity fetch error:', error)
//     return []
//   }
// }

export async function getSanityContent(
  query: string,
  params?: Record<string, any>
) {
  if (!SANITY_PROJECT_ID) {
    console.warn('Sanity not configured')
    return []
  }

  try {
    const client = await getClient()
    const data = await client.fetch(query, params)
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
    "logo": logo.asset->url,
    "posterImages": posterImages[].asset->url,
    learnMoreUrl,
    learnMoreText,
    videoUrl,
    watchText,
    synopsis,
    role,
    featured
  }`
  return getSanityContent(query)
}

export async function getAllStudioProjects() {
  const query = `*[_type == "film"] | order(_createdAt desc) {
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
    featured
  }`
  return getSanityContent(query)
}

export async function getFeaturedSideFilms() {
  const query = `*[_type == "sideFilm" && featured == true] | order(_createdAt desc) {
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
    "slug": slug
  }`
  return getSanityContent(query)
}

export async function getSideFilms() {
  const query = `*[_type == "sideFilm"] | order(_createdAt desc) {
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
    "slug": slug
  }`
  return getSanityContent(query)
}

export async function getSideFilmBySlug(slug: string) {
  const query = `*[_type == "sideFilm" && slug.current == $slug][0] {
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
  }`
  return getSanityContent(query, { slug })
}

export async function getFilmById(id: string) {
  const query = `*[_type in ["film", "sideFilm"] && _id == $id][0] {
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
    "slug": slug
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
  bannerImage?: string
  logo?: string
  posterImages?: string[]
  learnMoreUrl?: string
  videoUrl?: string
  synopsis?: string
  role?: string
  featured?: boolean
  slug?: { current: string }
  pageType?: 'filmCard' | 'projectPage'
  watchText?: string
  learnMoreText?: string
  content?: Array<Record<string, any>>
}
