import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index';

const singletonTypes    = new Set(['settings']);
const singletonActions  = new Set(['publish', 'discardChanges', 'restore']);

function singletonStructure(S) {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('⚙️ Global Settings')
        .id('settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.divider(),
      S.listItem()
        .title('📄 Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('All Pages')),
      S.divider(),
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

  projectId: 'qb2b9bdq',
  dataset:   'production',

  plugins: [
    structureTool({ structure: singletonStructure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => singletonActions.has(action))
        : prev,
  },
});
