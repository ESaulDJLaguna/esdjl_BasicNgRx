import { Component, inject, input } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { characterActions } from '../../store/characters.actions';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../app.routes';

@Component({
  selector: 'character-card',
  imports: [RouterLink],
  templateUrl: './character-card.component.html',
})
export class CharacterCardComponent {
  private store = inject(Store<AppState>);
  protected AppRoutes = AppRoutes;

  character = input.required<Character>();

  remove() {
    this.store.dispatch(
      characterActions.removeCharacter({ id: this.character()!.id }),
    );
  }
}
