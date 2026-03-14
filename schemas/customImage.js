// schemas/customImage.js
export const customImage = {
  name: 'customImage',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'imageType',
      title: 'Image Source',
      type: 'string',
      options: {
        list: [
          { title: '📁 Upload (Sanity Asset)', value: 'asset' },
          { title: '🔗 External URL',           value: 'url'   },
          { title: '🖼️ Gallery',                value: 'gallery' },
        ],
        layout: 'radio',
      },
      initialValue: 'asset',
      validation: Rule => Rule.required(),
    },
    // ── Sanity Asset ────────────────────────────────────────
    {
      name: 'asset',
      title: 'Upload Image',
      type: 'image',
      options: { hotspot: true, metadata: ['blurhash', 'lqip', 'palette'] },
      hidden: ({ parent }) => parent?.imageType !== 'asset',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (required for WCAG)',
          type: 'string',
          validation: Rule => Rule.custom((val, ctx) =>
            ctx.parent?.imageType === 'asset' && !val
              ? 'Alt text is required for uploaded images.' : true),
        },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
    },
    // ── External URL ────────────────────────────────────────
    {
      name: 'externalUrl',
      title: 'External Image URL',
      type: 'url',
      description: 'Full URL starting with https://',
      hidden: ({ parent }) => parent?.imageType !== 'url',
    },
    {
      name: 'externalAlt',
      title: 'Alt Text (External)',
      type: 'string',
      hidden: ({ parent }) => parent?.imageType !== 'url',
    },
    // ── Gallery ─────────────────────────────────────────────
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt',     title: 'Alt Text', type: 'string' },
          { name: 'caption', title: 'Caption',  type: 'string' },
        ],
      }],
      hidden: ({ parent }) => parent?.imageType !== 'gallery',
    },
    // ── Shared ──────────────────────────────────────────────
    {
      name: 'objectFit',
      title: 'Object Fit',
      type: 'string',
      options: { list: ['cover', 'contain', 'fill', 'none'], layout: 'radio' },
      initialValue: 'cover',
    },
  ],
  preview: {
    select: { imageType: 'imageType', asset: 'asset', externalUrl: 'externalUrl' },
    prepare({ imageType, asset, externalUrl }) {
      const labels = { asset: '📁 Sanity Asset', url: `🔗 ${externalUrl || '(no URL)'}`, gallery: '🖼️ Gallery' };
      return { title: labels[imageType] || 'Image', media: asset };
    },
  },
};
