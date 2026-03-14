// schemas/blocks.js  — all 5 Page Builder block schemas

// ── Hero ──────────────────────────────────────────────────────
export const heroBlock = {
  name: 'heroBlock', title: 'Hero Section', type: 'object', icon: () => '🚀',
  fields: [
    { name: 'eyebrow',      title: 'Eyebrow Label',  type: 'string' },
    { name: 'headline',     title: 'Headline',        type: 'string', validation: R => R.required().max(100) },
    { name: 'subheadline',  title: 'Sub-headline',    type: 'text', rows: 3 },
    {
      name: 'variant', title: 'Layout Variant', type: 'string',
      options: { list: [{ title: 'Centered', value: 'centered' }, { title: 'Split (text + image)', value: 'split' }, { title: 'Video Background', value: 'video' }] },
      initialValue: 'centered',
    },
    { name: 'backgroundImage', title: 'Background Image', type: 'customImage' },
    {
      name: 'backgroundVideo', title: 'Background Video URL', type: 'url',
      hidden: ({ parent }) => parent?.variant !== 'video',
    },
    { name: 'primaryCta',   title: 'Primary CTA',   type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'href', type: 'string', title: 'URL' }] },
    { name: 'secondaryCta', title: 'Secondary CTA', type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'href', type: 'string', title: 'URL' }] },
    {
      name: 'stats', title: 'Stats', type: 'array',
      of: [{ type: 'object', fields: [{ name: 'value', title: 'Value', type: 'string' }, { name: 'label', title: 'Label', type: 'string' }], preview: { select: { title: 'value', subtitle: 'label' } } }],
    },
  ],
  preview: { select: { title: 'headline', subtitle: 'variant' }, prepare: ({ title, subtitle }) => ({ title: `🚀 Hero: ${title || 'Untitled'}`, subtitle }) },
};

// ── Service Grid ──────────────────────────────────────────────
export const serviceGridBlock = {
  name: 'serviceGridBlock', title: 'Service Grid', type: 'object', icon: () => '⚙️',
  fields: [
    { name: 'sectionLabel', title: 'Section Eyebrow', type: 'string' },
    { name: 'headline',     title: 'Section Headline', type: 'string' },
    {
      name: 'pillar', title: 'Service Pillar', type: 'string',
      options: { list: [{ title: 'Pillar I — Workday', value: 'workday' }, { title: 'Pillar II — Web/AI', value: 'webdev' }, { title: 'Both', value: 'both' }] },
      initialValue: 'workday',
    },
    {
      name: 'layout', title: 'Grid Layout', type: 'string',
      options: { list: ['grid-3', 'grid-4', 'masonry'].map(v => ({ title: v, value: v })) },
      initialValue: 'grid-3',
    },
    {
      name: 'services', title: 'Service Cards', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon',        title: 'Icon (emoji)',  type: 'string' },
          { name: 'title',       title: 'Title',         type: 'string' },
          { name: 'description', title: 'Description',   type: 'text', rows: 3 },
          { name: 'features',    title: 'Feature Bullets', type: 'array', of: [{ type: 'string' }] },
          { name: 'badge',       title: 'Badge',         type: 'string' },
          { name: 'ctaLabel',    title: 'CTA Label',     type: 'string' },
          { name: 'ctaHref',     title: 'CTA URL',       type: 'string' },
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      }],
    },
  ],
  preview: { select: { title: 'headline', subtitle: 'pillar' }, prepare: ({ title, subtitle }) => ({ title: `⚙️ Services: ${title || 'Grid'}`, subtitle }) },
};

// ── AI Automation ─────────────────────────────────────────────
export const aiAutomationBlock = {
  name: 'aiAutomationBlock', title: 'AI Automation Showcase', type: 'object', icon: () => '🤖',
  fields: [
    { name: 'eyebrow',     title: 'Eyebrow',      type: 'string' },
    { name: 'headline',    title: 'Headline',     type: 'string' },
    { name: 'description', title: 'Description',  type: 'text', rows: 4 },
    {
      name: 'layoutStyle', title: 'Layout Style', type: 'string',
      options: { list: [{ title: 'Split', value: 'split' }, { title: 'Full-Width', value: 'fullwidth' }, { title: 'Cards', value: 'cards' }] },
      initialValue: 'split',
    },
    {
      name: 'capabilities', title: 'AI Capabilities', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title',       title: 'Title',       type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
          { name: 'techStack',   title: 'Tech Stack',  type: 'string' },
          { name: 'icon',        title: 'Icon Key',    type: 'string',
            options: { list: ['whatsapp-bot', 'nlp', 'vector-db', 'automation', 'prediction', 'document-ai'] } },
        ],
        preview: { select: { title: 'title', subtitle: 'techStack' } },
      }],
    },
    { name: 'demoImage', title: 'Demo Visual', type: 'customImage' },
    { name: 'ctaLabel',  title: 'CTA Label',  type: 'string' },
    { name: 'ctaHref',   title: 'CTA URL',    type: 'string' },
  ],
  preview: { select: { title: 'headline' }, prepare: ({ title }) => ({ title: `🤖 AI Automation: ${title || 'Section'}` }) },
};

// ── Tech Matrix ───────────────────────────────────────────────
export const techMatrixBlock = {
  name: 'techMatrixBlock', title: 'Technology Matrix', type: 'object', icon: () => '📊',
  fields: [
    { name: 'eyebrow',  title: 'Eyebrow',  type: 'string' },
    { name: 'headline', title: 'Headline', type: 'string' },
    {
      name: 'displayStyle', title: 'Display Style', type: 'string',
      options: { list: [{ title: 'Icon Grid', value: 'icon-grid' }, { title: 'Table', value: 'table' }, { title: 'Tabs', value: 'tabs' }] },
      initialValue: 'icon-grid',
    },
    {
      name: 'rows', title: 'Technology Rows', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'solution',  title: 'Solution',   type: 'string' },
          { name: 'techStack', title: 'Tech Stack', type: 'string' },
          { name: 'benefit',   title: 'Core Benefit', type: 'string' },
          { name: 'logo',      title: 'Logo',       type: 'customImage' },
          { name: 'category',  title: 'Category',   type: 'string',
            options: { list: ['Mobile', 'Enterprise', 'CMS', 'Marketing', 'AI', 'ERP'] } },
        ],
        preview: { select: { title: 'solution', subtitle: 'techStack' } },
      }],
    },
    { name: 'showLifecycle', title: 'Show 5-Step Lifecycle?', type: 'boolean', initialValue: false },
    {
      name: 'lifecycle', title: '5-Step Lifecycle', type: 'array',
      hidden: ({ parent }) => !parent?.showLifecycle,
      of: [{
        type: 'object',
        fields: [
          { name: 'step',        title: 'Step #',      type: 'number' },
          { name: 'label',       title: 'Step Label',  type: 'string' },
          { name: 'icon',        title: 'Icon (emoji)', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
        ],
        preview: { select: { title: 'label', subtitle: 'step' } },
      }],
    },
  ],
  preview: { select: { title: 'headline', subtitle: 'displayStyle' }, prepare: ({ title, subtitle }) => ({ title: `📊 Tech Matrix: ${title || 'Grid'}`, subtitle }) },
};

// ── Image Gallery ─────────────────────────────────────────────
export const imageGalleryBlock = {
  name: 'imageGalleryBlock', title: 'Image Gallery', type: 'object', icon: () => '🖼️',
  fields: [
    { name: 'headline', title: 'Section Headline', type: 'string' },
    {
      name: 'galleryStyle', title: 'Gallery Style', type: 'string',
      options: { list: [{ title: 'Masonry Grid', value: 'masonry' }, { title: 'Horizontal Scroll', value: 'scroll' }, { title: 'Lightbox Grid', value: 'lightbox' }] },
      initialValue: 'masonry',
    },
    { name: 'columns', title: 'Columns', type: 'number', options: { list: [2, 3, 4] }, initialValue: 3 },
    { name: 'images',  title: 'Images',  type: 'array', of: [{ type: 'customImage' }], validation: R => R.min(2) },
  ],
  preview: { select: { title: 'headline', subtitle: 'galleryStyle' }, prepare: ({ title, subtitle }) => ({ title: `🖼️ Gallery: ${title || 'Untitled'}`, subtitle }) },
};
