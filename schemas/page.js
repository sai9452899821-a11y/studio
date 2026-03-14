// schemas/page.js
export const page = {
  name: 'page', title: 'Pages', type: 'document', icon: () => '📄',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string', validation: R => R.required() },
    { name: 'slug',  title: 'URL Slug',   type: 'slug', options: { source: 'title', maxLength: 96 }, validation: R => R.required() },
    {
      name: 'seo', title: 'SEO & Meta', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'metaTitle',       title: 'Meta Title',       type: 'string',  validation: R => R.max(60) },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: R => R.max(160) },
        { name: 'ogImage',         title: 'OG Image',         type: 'image', options: { hotspot: true } },
        { name: 'noIndex',         title: 'No Index',         type: 'boolean', initialValue: false },
      ],
    },
    {
      name: 'pillarTheme', title: 'Pillar Theme', type: 'string',
      options: { list: [{ title: '🏢 Workday (Navy)', value: 'workday' }, { title: '💻 Web/AI (Teal)', value: 'webdev' }, { title: '🌐 Global', value: 'global' }], layout: 'radio' },
      initialValue: 'global',
    },
    {
      name: 'headerStyle', title: 'Header Style', type: 'string',
      options: { list: ['default', 'transparent', 'hidden'].map(v => ({ title: v[0].toUpperCase() + v.slice(1), value: v })) },
      initialValue: 'default',
    },
    {
      name: 'pageBuilder', title: '🧱 Page Builder', type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'serviceGridBlock' },
        { type: 'aiAutomationBlock' },
        { type: 'techMatrixBlock' },
        { type: 'imageGalleryBlock' },
      ],
    },
  ],
  orderings: [{ title: 'Title A→Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', slug: 'slug.current', pillar: 'pillarTheme' },
    prepare({ title, slug, pillar }) {
      const icons = { workday: '🏢', webdev: '💻', global: '🌐' };
      return { title: `${icons[pillar] || '📄'} ${title}`, subtitle: slug ? `/${slug}` : '(no slug)' };
    },
  },
};
