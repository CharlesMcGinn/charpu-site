import {
  getLogos,
  getFeaturedWorks,
  getSideFilms,
} from '@/lib/sanity'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (!type) {
    return Response.json(
      { error: 'type parameter is required' },
      { status: 400 }
    )
  }

  try {
    let data: any[] = []

    switch (type) {
      case 'client-logos':
        data = await getLogos()
        break
      case 'featured-works':
        data = await getFeaturedWorks()
        break
      case 'side-films-preview':
      case 'side-films':
        data = await getSideFilms()
        break
      default:
        return Response.json(
          { error: 'Unknown type' },
          { status: 400 }
        )
    }

    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (error) {
    console.error('Sanity API error:', error)
    return Response.json([], {
      status: 500,
    })
  }
}
