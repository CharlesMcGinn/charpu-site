const BUILDER_API_KEY = 'da2b7228a4fa4a45b76e5f8144452567';
const BUILDER_API_BASE = 'https://cdn.builder.io/api/v1/content';

interface BuilderContent {
  id: string;
  data: Record<string, any>;
}

export async function getBuilderContent(
  model: string,
  options?: {
    limit?: number;
    offset?: number;
    query?: Record<string, any>;
  }
) {
  try {
    const params = new URLSearchParams({
      model,
      limit: (options?.limit || 100).toString(),
      offset: (options?.offset || 0).toString(),
    });

    // Use API route for client-side fetching, direct API for server-side
    const isClientSide = typeof window !== 'undefined';

    if (isClientSide) {
      const response = await fetch(`/api/builder/content?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } else {
      // Server-side: use direct API with ISR
      if (options?.query) {
        params.append('query', JSON.stringify(options.query));
      }
      params.append('apiKey', BUILDER_API_KEY);

      const response = await fetch(`${BUILDER_API_BASE}/${model}?${params.toString()}`, {
        next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
      });

      if (!response.ok) {
        throw new Error(`Builder.io API error: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    }
  } catch (error) {
    console.error('Builder.io fetch error:', error);
    return [];
  }
}

export async function getBuilderContentById(model: string, id: string) {
  try {
    const params = new URLSearchParams({
      apiKey: BUILDER_API_KEY,
    });

    const response = await fetch(`${BUILDER_API_BASE}/${model}/${id}?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Builder.io API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Builder.io fetch error:', error);
    return null;
  }
}

export interface Film {
  id: string;
  title: string;
  duration: string;
  categories: string[];
  year: number;
  bannerImage: string;
  posterImages: string[];
  trailerUrl?: string;
  videoUrl?: string;
  synopsis: string;
  role?: string;
}

export interface LogoItem {
  id: string;
  name: string;
  image: string;
}
