import { defineType, defineField } from 'sanity'

export const quoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Quote Block',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
    }),
  ],
})
