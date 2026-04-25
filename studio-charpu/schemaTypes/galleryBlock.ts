import { defineType, defineField } from 'sanity'

export const galleryBlock = defineType({
  name: 'galleryBlock',
  title: 'Gallery Block',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
        images: 'images',
        caption: 'caption',
    },
    prepare({ images, caption }) {
        return {
        title: caption || 'Gallery',
        media: images && images[0],
        }
    },
    }
})
