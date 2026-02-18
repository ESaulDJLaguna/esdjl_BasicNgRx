import { Routes } from '@angular/router';
import { CatalogPageComponent } from './catalog/pages/catalog-page/catalog-page.component';
import { POKEMONS_ROUTES } from './pokemons/routes/pokemons.constant';
import { CHARACTERS_ROUTES } from './characters/routes/characters.constant';

export interface ModuleRoute {
  name: string;
  fullPath: string;
  title: string;
}

export const AppRoutes = {
  ...CHARACTERS_ROUTES,
  ...POKEMONS_ROUTES,
};

export const routes: Routes = [
  {
    path: AppRoutes.Characters.name,
    loadChildren: () => import('./characters/routes/characters.routes'),
    title: AppRoutes.Characters.title,
  },
  {
    path: 'catalog',
    component: CatalogPageComponent,
    title: 'Catalog',
  },
  {
    path: AppRoutes.Pokemons.name,
    loadChildren: () => import('./pokemons/routes/pokemons.routes'),
    title: AppRoutes.Pokemons.title,
  },
];
