import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Character } from '../interfaces/character.interface';

export const characterActions = createActionGroup({
  source: 'Characters',
  events: {
    'Add Character': props<{ charachter: Character }>(),
    'Remove Character': props<{ id: number }>(),
    'Edit Character': props<{ charachter: Character }>(),
  },
});
