import { createReducer, on } from '@ngrx/store';
import { PokemonState } from './models/pokemon-state.model';
import { pokemonsActions } from './pokemons.actions';

const initialState: PokemonState = {
  pokemonPagination: {
    isLoading: false,
    data: null,
    currentPage: 1,
  },
  pokemons: {
    isLoading: false,
    data: [],
  },
};

export const pokemonsReducer = createReducer(
  initialState,
  on(pokemonsActions.loadingPokemonsPagination, (state) => ({
    ...state,
    pokemonPagination: {
      ...state.pokemonPagination,
      isLoading: true,
    },
  })),
  on(pokemonsActions.loadNextPokemonsPage, (state) => ({
    ...state,
    pokemonPagination: {
      ...state.pokemonPagination,
      currentPage: state.pokemonPagination.currentPage + 1,
      isLoading: true,
    },
  })),
  on(pokemonsActions.loadPreviousPokemonsPage, (state) => ({
    ...state,
    pokemonPagination: {
      ...state.pokemonPagination,
      currentPage:
        state.pokemonPagination.currentPage - 1 < 1
          ? 1
          : state.pokemonPagination.currentPage - 1,
      isLoading: true,
    },
  })),
  on(
    pokemonsActions.loadPokemonsPaginationSuccess,
    (state, { pagination }) => ({
      ...state,
      pokemonPagination: {
        ...state.pokemonPagination,
        isLoading: false,
        data: pagination,
      },
    }),
  ),
  on(pokemonsActions.loadingPokemonDetail, (state) => ({
    ...state,
    pokemons: {
      ...state.pokemons,
      isLoading: true,
    },
  })),
  on(pokemonsActions.loadPokemonDetailsSuccess, (state, { pokemonInfo }) => {
    const pokemonExists = state.pokemons.data.some(
      (pokemon) => pokemon.id === pokemonInfo.id,
    );

    return {
      ...state,
      pokemons: {
        isLoading: false,
        data: pokemonExists
          ? [...state.pokemons.data]
          : [...state.pokemons.data, pokemonInfo],
      },
    };
  }),
  on(pokemonsActions.removingPokemon, (state) => ({
    ...state,
    pokemons: {
      ...state.pokemons,
      isLoading: true,
    },
  })),
  on(pokemonsActions.removePokemon, (state, { index }) => ({
    ...state,
    pokemons: {
      isLoading: false,
      data: state.pokemons.data.filter((_, i) => i !== index),
    },
  })),
  on(pokemonsActions.clearPokemons, (state) => ({
    ...state,
    pokemons: {
      isLoading: false,
      data: [],
    },
  })),
);
