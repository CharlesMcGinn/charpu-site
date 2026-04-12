const BUILDER_API_KEY = 'charlesapi';
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
      apiKey: BUILDER_API_KEY,
      limit: (options?.limit || 100).toString(),
      offset: (options?.offset || 0).toString(),
    });

    if (options?.query) {
      params.append('query', JSON.stringify(options.query));
    }

    const response = await fetch(`${BUILDER_API_BASE}/${model}?${params.toString()}`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Builder.io API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
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
