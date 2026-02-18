import { createReducer, on } from '@ngrx/store';
import { characterActions } from './characters.actions';
import { CharacterState } from '../interfaces/character-state.interface';

const initialState: CharacterState = {
  items: [
    {
      id: 1,
      name: 'Goku',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS70CqGaZ23V3UDmCeRSOz6CRKhL_6YL-bkXjdiYPnq_DJVnIirOPklhiIkATjZWl6LgN_aBkP-50KuCGvr6yDTgxfgFzhOBBKHf2KGGA&s=10',
      source: 'Dragon Ball',
    },
    {
      id: 2,
      name: 'Vegeta',
      url: 'https://i.blogs.es/acc7e2/vegeta-ultraego-dragon-ball/1200_900.jpeg',
      source: 'Dragon Ball',
    },
    {
      id: 3,
      name: 'Hayasaka Ai',
      url: 'https://cdn.rafled.com/anime-icons/images/6LIgfzgu4NrKnqx9TaOMtqhgLSXiEb2Q.jpg',
      source: 'Kaguya-sama: Love is War',
    },
  ],
};

export const charactersReducer = createReducer(
  initialState,
  on(characterActions.addCharacter, (state, props) => ({
    items: [
      ...state.items,
      {
        ...props.charachter,
        id:
          state.items.length > 0
            ? state.items[state.items.length - 1].id + 1
            : 1,
      },
    ],
  })),
  on(characterActions.removeCharacter, (state, props) => ({
    items: state.items.filter((character) => character.id !== props.id),
  })),
  on(characterActions.editCharacter, (state, props) => ({
    items: state.items.map((character) =>
      character.id === props.charachter.id ? props.charachter : character,
    ),
  })),
);
