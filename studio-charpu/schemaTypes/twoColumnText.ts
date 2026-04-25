import { defineType, defineField } from 'sanity'

export const twoColumnText = defineType({
  name: 'twoColumnText',
  title: 'Two Column Text',
  type: 'object',
  fields: [
    defineField({
      name: 'left',
      title: 'Left Column',
      type: 'array',
      of: [{ type: 'block' }, { type: 'imageBlock' }],
    }),
    defineField({
      name: 'right',
      title: 'Right Column',
      type: 'array',
      of: [{ type: 'block' }, { type: 'imageBlock' }],
    }),
  ],
})
