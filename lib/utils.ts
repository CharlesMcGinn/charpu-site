import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractYouTubeId(url?: string) {
  if (!url) return null
  try {
    // common formats: https://youtu.be/ID, https://www.youtube.com/watch?v=ID, /embed/ID
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.slice(1)
    }
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1]
      return u.searchParams.get('v')
    }
  } catch (e) {
    // if it's just an id
    const idMatch = url.match(/[a-zA-Z0-9_-]{11}/)
    return idMatch ? idMatch[0] : null
  }
  return null
}
