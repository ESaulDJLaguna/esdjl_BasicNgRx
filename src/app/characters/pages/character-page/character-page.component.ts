import { Component, inject } from '@angular/core';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  selectCharacter,
  selectCharactersCount,
  selectNameFirstCharacter,
} from '../../store/characters.selectors';
import { AppRoutes } from '../../../app.routes';

@Component({
  selector: 'app-character-page',
  imports: [CharacterCardComponent, AsyncPipe, RouterLink],
  templateUrl: './character-page.component.html',
})
export class CharacterPageComponent {
  private store = inject(Store<AppState>);
  protected AppRoutes = AppRoutes;

  charactres$ = this.store.select(selectCharacter);
  charactersCount$ = this.store.select(selectCharactersCount);
  firstCharacter$ = this.store.select(selectNameFirstCharacter);
}
