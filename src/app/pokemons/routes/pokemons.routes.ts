import { Routes } from '@angular/router';
import { PokemonsPageComponent } from '../pages/pokemons-page/pokemons-page.component';

export const pokemonsRoutes: Routes = [
  {
    path: '',
    component: PokemonsPageComponent,
  },
];

export default pokemonsRoutes;
