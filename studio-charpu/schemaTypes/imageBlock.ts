import { defineType, defineField } from 'sanity'

export const imageBlock = defineType({
  name: 'imageBlock',
  type: 'object',
  title: 'Image Block',
  fields: [
    { name: 'image', type: 'image' },
    { name: 'caption', type: 'string' },
  ],
  preview: {
    select: {
      media: 'image',
      title: 'caption',
    },
    prepare({ media, title }) {
      return {
        title: title || 'Image',
        media,
      }
    },
  },
})
