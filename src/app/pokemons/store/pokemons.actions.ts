import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PokemonPaginatorResponse } from '../interfaces/pokemon-paginator.interface';
import { PokemonInfo } from '../interfaces/pokemon-info.interface';

export const pokemonsActions = createActionGroup({
  source: 'Pokemons',
  events: {
    'Loading Pokemons Pagination': emptyProps(),
    'Load Pokemons Pagination Success': props<{
      pagination: PokemonPaginatorResponse;
    }>(),
    'Load Next Pokemons Page': emptyProps(),
    'Load Previous Pokemons Page': emptyProps(),
    'Loading Pokemon Detail': props<{ pokemonName: string }>(),
    'Load Pokemon Details Success': props<{ pokemonInfo: PokemonInfo }>(),
    'Removing Pokemon': emptyProps(),
    'Remove Pokemon': props<{ index: number }>(),
    'Clear Pokemons': emptyProps(),
  },
});
