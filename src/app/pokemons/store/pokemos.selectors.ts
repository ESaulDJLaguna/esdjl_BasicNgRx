import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { PokemonState } from './models/pokemon-state.model';

export const pokemonsState = (state: AppState) => state.pokemons;

export const isLoadingPokemonPaginationSelector = createSelector(
  pokemonsState,
  (state: PokemonState) => state.pokemonPagination.isLoading,
);

export const currentPageSelector = createSelector(
  pokemonsState,
  (state: PokemonState) => state.pokemonPagination.currentPage,
);

export const hasPreviousPageSelector = createSelector(
  pokemonsState,
  (state: PokemonState) => state.pokemonPagination.currentPage > 1,
);

export const hassNextPageSelector = createSelector(
  pokemonsState,
  (state: PokemonState) => {
    const currentPage = state.pokemonPagination.currentPage;
    const limit = 9;
    const totalCount = state.pokemonPagination.data?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return currentPage < totalPages;
  },
);

export const pokemonPaginationResultsSelector = createSelector(
  pokemonsState,
  (state: PokemonState) => state.pokemonPagination.data?.results ?? [],
);

export const isLoadingPokemonDetailSelector = createSelector(
  pokemonsState,
  (state: PokemonState) => state.pokemons.isLoading,
);

export const pokemonsSelector = createSelector(
  pokemonsState,
  (state: PokemonState) => state.pokemons.data,
);

export const pokemonDetailCountSelector = createSelector(
  pokemonsState,
  (state: PokemonState) => state.pokemons.data.length,
);
