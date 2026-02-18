import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { CharacterState } from '../interfaces/character-state.interface';

export const charactersState = (state: AppState) => state.characters;

export const selectCharacter = createSelector(
  charactersState,
  (state: CharacterState) => state.items,
);

export const selectCharactersCount = createSelector(
  charactersState,
  (state: CharacterState) => state.items.length,
);

export const selectNameFirstCharacter = createSelector(
  charactersState,
  (state: CharacterState) => state.items[0]?.name ?? 'No characters',
);
