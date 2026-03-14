// schemas/blog.js — Blog Post document type
export const blogPost = {
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  icon: () => '✍️',
  fields: [
    { name: 'title',     title: 'Post Title',  type: 'string', validation: R => R.required() },
    { name: 'slug',      title: 'URL Slug',    type: 'slug', options: { source: 'title', maxLength: 96 }, validation: R => R.required() },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '🏢 Workday Strategy',  value: 'workday'   },
          { title: '💻 Engineering & AI',  value: 'engineering' },
          { title: '📊 Industry Trends',   value: 'industry'  },
          { title: '🚀 Case Studies',      value: 'casestudy' },
        ],
      },
      validation: R => R.required(),
    },
    { name: 'excerpt',      title: 'Excerpt / Snippet',  type: 'text', rows: 3, validation: R => R.required().max(300) },
    { name: 'publishedAt',  title: 'Published Date',     type: 'datetime', initialValue: () => new Date().toISOString() },
    { name: 'readTime',     title: 'Read Time (minutes)', type: 'number' },
    { name: 'featured',     title: 'Featured Post?',     type: 'boolean', initialValue: false },
    { name: 'coverImage',   title: 'Cover Image',        type: 'customImage' },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'name',   title: 'Author Name',  type: 'string' },
        { name: 'role',   title: 'Role / Title', type: 'string' },
        { name: 'avatar', title: 'Avatar',       type: 'customImage' },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal',    value: 'normal' },
            { title: 'H2',        value: 'h2' },
            { title: 'H3',        value: 'h3' },
            { title: 'H4',        value: 'h4' },
            { title: 'Quote',     value: 'blockquote' },
            { title: 'Code',      value: 'code' },
          ],
          marks: {
            decorators: [
              { title: 'Bold',      value: 'strong' },
              { title: 'Italic',    value: 'em' },
              { title: 'Code',      value: 'code' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: false },
                ],
              },
            ],
          },
        },
        { type: 'customImage' },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            { name: 'type', title: 'Type', type: 'string', options: { list: ['info', 'tip', 'warning', 'success'] }, initialValue: 'info' },
            { name: 'text', title: 'Text', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'text', subtitle: 'type' } },
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            { name: 'language', title: 'Language', type: 'string', options: { list: ['javascript', 'typescript', 'bash', 'json', 'xml', 'sql', 'python'] } },
            { name: 'code',     title: 'Code',     type: 'text' },
            { name: 'filename', title: 'Filename', type: 'string' },
          ],
          preview: { select: { title: 'filename', subtitle: 'language' } },
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'metaTitle',       title: 'Meta Title',       type: 'string',  validation: R => R.max(60) },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2, validation: R => R.max(160) },
      ],
    },
    {
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
    },
  ],
  orderings: [
    { title: 'Published (newest first)', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Featured first',           name: 'featuredFirst', by: [{ field: 'featured',    direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', category: 'category', featured: 'featured', media: 'coverImage.asset' },
    prepare({ title, category, featured, media }) {
      const cats = { workday: '🏢', engineering: '💻', industry: '📊', casestudy: '🚀' };
      return { title: `${featured ? '⭐ ' : ''}${cats[category] || '✍️'} ${title}`, subtitle: category, media };
    },
  },
};
