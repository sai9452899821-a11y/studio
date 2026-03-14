// schemas/index.js — Central schema registry
import { customImage }     from './customImage';
import { settings }        from './settings';
import { page }            from './page';
import { blogPost }        from './blog';
import {
  heroBlock,
  serviceGridBlock,
  aiAutomationBlock,
  techMatrixBlock,
  imageGalleryBlock,
} from './blocks';

export const schemaTypes = [
  // Documents
  settings,
  page,
  blogPost,
  // Reusable objects
  customImage,
  // Page Builder blocks
  heroBlock,
  serviceGridBlock,
  aiAutomationBlock,
  techMatrixBlock,
  imageGalleryBlock,
];
