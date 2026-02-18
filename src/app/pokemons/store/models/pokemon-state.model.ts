import { PokemonInfo } from '../../interfaces/pokemon-info.interface';
import { PokemonPaginatorResponse } from '../../interfaces/pokemon-paginator.interface';

export interface PokemonState {
  pokemonPagination: PokemonPagination;
  pokemons: Pokemons;
}

export interface PokemonPagination {
  isLoading: boolean;
  data: PokemonPaginatorResponse | null;
  currentPage: number;
}

export interface Pokemons {
  isLoading: boolean;
  data: PokemonInfo[];
}
