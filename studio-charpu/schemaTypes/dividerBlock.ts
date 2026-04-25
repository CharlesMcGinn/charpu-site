import { defineType, defineField } from 'sanity'


export const dividerBlock = defineType({
  name: 'dividerBlock',
  title: 'Divider',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Thin', value: 'thin' },
          { title: 'Thick', value: 'thick' },
        ],
      },
      initialValue: 'thin',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Divider' }
    },
  },
})