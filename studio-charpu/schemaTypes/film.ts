// schemaTypes/film.ts
import { defineType, defineField } from 'sanity'

export const film = defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),

    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'posterImages',
      title: 'Poster Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    defineField({
      name: 'learnMoreUrl',
      title: 'Learn More URL',
      type: 'url',
    }),

    defineField({
      name: 'learnMoreText',
      title: 'Learn More Text',
      type: 'string',
      initialValue: 'Learn More',
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    }),

    defineField({
      name: 'watchText',
      title: 'Watch Video Text',
      type: 'string',
      initialValue: 'Play',
    }),

    defineField({
      name: 'synopsis',
      title: 'Synopsis',
      type: 'text',
    }),

    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})