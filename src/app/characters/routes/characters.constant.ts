import { ModuleRoute } from '../../app.routes';

const CHARACTERS_INDEX_ROUTE = 'characters';
export const CHARACTERS_ROUTES = {
  Characters: {
    name: CHARACTERS_INDEX_ROUTE,
    fullPath: `/${CHARACTERS_INDEX_ROUTE}`,
    title: 'Characters',
  },
  AddCharacter: {
    name: 'add',
    fullPath: `/${CHARACTERS_INDEX_ROUTE}/add`,
    title: 'Add Character',
  },
  EditCharacter: {
    name: 'edit',
    fullPath: `/${CHARACTERS_INDEX_ROUTE}/edit`,
    title: 'Edit Character',
  },
} satisfies Record<string, ModuleRoute>;
