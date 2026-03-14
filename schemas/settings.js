// schemas/settings.js — Global Settings singleton (header + footer)
export const settings = {
  name: 'settings', title: 'Global Settings', type: 'document', icon: () => '⚙️',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'siteTitle', title: 'Site Title', type: 'string', initialValue: 'VCS Pro | Virupaksha Consulting Services' },
    { name: 'siteLogo',  title: 'Logo',       type: 'customImage' },
    { name: 'favicon',   title: 'Favicon',    type: 'image' },

    // ── HEADER ──────────────────────────────────────────────
    {
      name: 'header', title: '🔝 Header', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'navItems', title: 'Navigation Items', type: 'array',
          of: [{
            type: 'object', name: 'navItem',
            fields: [
              { name: 'title',         title: 'Label',        type: 'string', validation: R => R.required() },
              { name: 'href',          title: 'URL',          type: 'string', validation: R => R.required() },
              { name: 'openInNewTab',  title: 'New Tab?',     type: 'boolean', initialValue: false },
              { name: 'badge',         title: 'Badge',        type: 'string' },
              {
                name: 'subItems', title: 'Dropdown Items', type: 'array',
                of: [{
                  type: 'object',
                  fields: [
                    { name: 'title',       title: 'Label',        type: 'string' },
                    { name: 'href',        title: 'URL',          type: 'string' },
                    { name: 'description', title: 'Description',  type: 'string' },
                    { name: 'pillar',      title: 'Pillar',       type: 'string', options: { list: ['workday', 'webdev', 'shared'] } },
                  ],
                  preview: { select: { title: 'title', subtitle: 'href' } },
                }],
              },
            ],
            preview: { select: { title: 'title', subtitle: 'href' } },
          }],
        },
        {
          name: 'ctaButton', title: 'Header CTA Button', type: 'object',
          fields: [
            { name: 'label',   title: 'Label',   type: 'string', placeholder: 'Book a Discovery Call' },
            { name: 'href',    title: 'URL',     type: 'string' },
            { name: 'variant', title: 'Style',   type: 'string', options: { list: ['primary', 'ghost', 'outline'] }, initialValue: 'primary' },
          ],
        },
        {
          name: 'announcementBanner', title: 'Announcement Banner', type: 'object',
          options: { collapsible: true, collapsed: true },
          fields: [
            { name: 'enabled',  title: 'Show Banner', type: 'boolean', initialValue: false },
            { name: 'message',  title: 'Message',     type: 'string' },
            { name: 'ctaLabel', title: 'CTA Label',   type: 'string' },
            { name: 'ctaHref',  title: 'CTA URL',     type: 'string' },
            { name: 'theme',    title: 'Theme',       type: 'string', options: { list: ['teal', 'navy', 'dark', 'warning'] }, initialValue: 'teal' },
          ],
        },
        {
          name: 'socialIcons', title: 'Social Icons', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'platform',  title: 'Platform', type: 'string',
                options: { list: [{ title: 'LinkedIn', value: 'linkedin' }, { title: 'GitHub', value: 'github' }, { title: 'Twitter/X', value: 'twitter' }, { title: 'YouTube', value: 'youtube' }, { title: 'Email', value: 'email' }] },
                validation: R => R.required() },
              { name: 'url',       title: 'URL',       type: 'url', validation: R => R.required() },
              { name: 'ariaLabel', title: 'Aria Label', type: 'string' },
            ],
            preview: { select: { title: 'platform', subtitle: 'url' } },
          }],
        },
      ],
    },

    // ── FOOTER ──────────────────────────────────────────────
    {
      name: 'footer', title: '⬇️ Footer', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'linkColumns', title: 'Footer Link Columns', type: 'array',
          of: [{
            type: 'object', name: 'footerColumn',
            fields: [
              { name: 'columnTitle', title: 'Column Heading', type: 'string', validation: R => R.required() },
              { name: 'pillarTag',   title: 'Pillar Accent',  type: 'string', options: { list: ['workday', 'webdev', 'shared'] } },
              {
                name: 'links', title: 'Links', type: 'array',
                of: [{
                  type: 'object',
                  fields: [
                    { name: 'label',        title: 'Label',    type: 'string' },
                    { name: 'href',         title: 'URL',      type: 'string' },
                    { name: 'openInNewTab', title: 'New Tab?', type: 'boolean', initialValue: false },
                    { name: 'badge',        title: 'Badge',    type: 'string' },
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                }],
              },
            ],
            preview: { select: { title: 'columnTitle', subtitle: 'pillarTag' } },
          }],
        },
        { name: 'legalText', title: 'Copyright Text', type: 'string', placeholder: '© 2025 Virupaksha Consulting Services.' },
        {
          name: 'legalLinks', title: 'Legal Links', type: 'array',
          of: [{ type: 'object', fields: [{ name: 'label', title: 'Label', type: 'string' }, { name: 'href', title: 'URL', type: 'string' }], preview: { select: { title: 'label' } } }],
        },
        {
          name: 'footerCta', title: 'Footer CTA Block', type: 'object',
          options: { collapsible: true, collapsed: true },
          fields: [
            { name: 'headline', title: 'Headline', type: 'string' },
            { name: 'subtext',  title: 'Subtext',  type: 'string' },
            {
              name: 'buttons', title: 'Buttons', type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'label',   title: 'Label',  type: 'string' },
                  { name: 'href',    title: 'URL',    type: 'string' },
                  { name: 'variant', title: 'Style',  type: 'string', options: { list: ['primary', 'ghost'] } },
                ],
                preview: { select: { title: 'label' } },
              }],
            },
          ],
        },
        {
          name: 'socialIcons', title: 'Social Icons (Footer)', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'platform',  title: 'Platform', type: 'string', options: { list: [{ title: 'LinkedIn', value: 'linkedin' }, { title: 'GitHub', value: 'github' }, { title: 'Twitter/X', value: 'twitter' }, { title: 'YouTube', value: 'youtube' }] } },
              { name: 'url',       title: 'URL',       type: 'url' },
              { name: 'ariaLabel', title: 'Aria Label', type: 'string' },
            ],
            preview: { select: { title: 'platform', subtitle: 'url' } },
          }],
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: '⚙️ Global Settings' }) },
};
