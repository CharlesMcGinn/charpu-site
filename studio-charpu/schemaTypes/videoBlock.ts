import { defineType, defineField } from 'sanity'

export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
        title: 'title',
        subtitle: 'videoUrl',
    },
    },
})
