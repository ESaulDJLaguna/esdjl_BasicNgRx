import { ModuleRoute } from '../../app.routes';

const POKEMOS_INDEX_ROUTE = 'pokemons';
export const POKEMONS_ROUTES = {
  Pokemons: {
    name: POKEMOS_INDEX_ROUTE,
    fullPath: `/${POKEMOS_INDEX_ROUTE}`,
    title: 'Pokemons',
  },
} satisfies Record<string, ModuleRoute>;
