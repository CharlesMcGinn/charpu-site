import { defineType, defineField } from 'sanity'

export const sideFilm = defineType({
  name: 'sideFilm',
  title: 'Side Film',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
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
      title: 'Watch Text',
      type: 'string',
      initialValue: 'Watch Teaser',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      initialValue: 'filmCard',
      options: {
        list: [
          { title: 'Film Card', value: 'filmCard' },
          { title: 'Project Page', value: 'projectPage' },
        ],
      },
    }),

    defineField({
        name: 'password',
        title: 'Password (optional)',
        type: 'string',
        description: 'Leave empty for public access',
    }),

    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading 1', value: 'h1' },
                { title: 'Heading 2', value: 'h2' },
                { title: 'Heading 3', value: 'h3' },

                { title: 'Align Left', value: 'left' },
                { title: 'Align Center', value: 'center' },
                { title: 'Align Right', value: 'right' },

                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [
                { title: 'Bullet List', value: 'bullet' },
                { title: 'Numbered List', value: 'number' },
            ],
            marks: {
                decorators: [
                { title: 'Bold', value: 'strong' },
                { title: 'Italic', value: 'em' },
                { title: 'Underline', value: 'underline' },
                ],
                annotations: [
                {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                    {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                    },
                    ],
                },
                ],
            },
         },
        { type: 'dividerBlock' },
        { type: 'imageBlock' },
        { type: 'videoBlock' },
        { type: 'quoteBlock' },
        { type: 'galleryBlock' },
        { type: 'twoColumnText' },
      ],
    }),
  ],
})
