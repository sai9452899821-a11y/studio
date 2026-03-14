import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index';

// ── Singleton helper ──────────────────────────────────────────
// Forces "settings" to always open in place (no document list).
const singletonTypes    = new Set(['settings']);
const singletonActions  = new Set(['publish', 'discardChanges', 'restore']);

function singletonStructure(S) {
  return S.list()
    .title('Content')
    .items([
      // ── Singleton: Global Settings ──
      S.listItem()
        .title('⚙️ Global Settings')
        .id('settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),

      S.divider(),

      // ── Pages ──
      S.listItem()
        .title('📄 Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('All Pages')),

      S.divider(),

      // ── Blog Posts ──
      S.listItem()
        .title('✍️ Blog Posts')
        .schemaType('blogPost')
        .child(S.documentTypeList('blogPost').title('All Blog Posts')),

      S.divider(),
    ]);
}

export default defineConfig({
  name:    'vcspro-studio',
  title:   'VCS Pro Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset:   process.env.SANITY_STUDIO_DATASET    || 'production',

  plugins: [
    structureTool({ structure: singletonStructure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Prevent multiple "settings" documents from being created
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Hide "delete" and "duplicate" actions on singleton types
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => singletonActions.has(action))
        : prev,
  },
});
