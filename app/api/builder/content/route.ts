const BUILDER_API_KEY = process.env.BUILDER_API_KEY || 'da2b7228a4fa4a45b76e5f8144452567';
const BUILDER_API_BASE = 'https://cdn.builder.io/api/v1/content';

// Fallback data for when Builder.io API is unavailable
const FALLBACK_DATA: Record<string, any[]> = {
  'client-logos': [],
  'featured-works': [],
  'side-films-preview': [],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const model = searchParams.get('model');

  if (!model) {
    return Response.json(
      { error: 'model parameter is required' },
      { status: 400 }
    );
  }

  try {
    const limit = searchParams.get('limit') || '100';
    const offset = searchParams.get('offset') || '0';

    const params = new URLSearchParams({
      apiKey: BUILDER_API_KEY,
      limit,
      offset,
    });

    const url = `${BUILDER_API_BASE}/${model}?${params.toString()}`;
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    const contentType = response.headers.get('content-type');

    // Check if response is JSON
    if (contentType?.includes('application/json') && response.ok) {
      const data = await response.json();
      return Response.json(data.results || [], {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      });
    } else {
      // Log the error but return graceful fallback
      const text = await response.text();
      console.warn(
        `Builder.io API warning for model "${model}":`,
        `Status ${response.status}, Content-Type: ${contentType}`
      );

      // Return fallback data instead of error
      return Response.json(FALLBACK_DATA[model] || [], {
        headers: {
          'Cache-Control': 'public, s-maxage=3600',
          'X-Data-Source': 'fallback',
        },
      });
    }
  } catch (error) {
    console.warn('Builder.io fetch error:', error);
    // Return fallback data instead of error
    return Response.json(FALLBACK_DATA[model || 'client-logos'] || [], {
      headers: {
        'Cache-Control': 'public, s-maxage=3600',
        'X-Data-Source': 'fallback',
      },
    });
  }
}
