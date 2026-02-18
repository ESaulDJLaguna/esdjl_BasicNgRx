import { ActionReducerMap } from '@ngrx/store';
import { Character } from './characters/interfaces/character.interface';
import { Article } from './catalog/interfaces/article.interface';
import { charactersReducer } from './characters/store/characters.reducers';
import { CharacterState } from './characters/interfaces/character-state.interface';
import { pokemonsReducer } from './pokemons/store/pokemons.reducers';
import { PokemonState } from './pokemons/store/models/pokemon-state.model';

export interface AppState {
  characters: CharacterState;
  catalog: Article[];
  pokemons: PokemonState;
}

export const ROOT_STORE: ActionReducerMap<AppState> = {
  characters: charactersReducer,
  catalog: () => [],
  pokemons: pokemonsReducer,
};
