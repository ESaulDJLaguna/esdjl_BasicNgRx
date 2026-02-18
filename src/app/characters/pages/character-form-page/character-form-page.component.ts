import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Character } from '../../interfaces/character.interface';
import { characterActions } from '../../store/characters.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character-form-page',
  imports: [ReactiveFormsModule],
  templateUrl: './character-form-page.component.html',
})
export class CharacterFormPageComponent {
  private activatedRotue = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store<AppState>);

  private characterId = this.activatedRotue.snapshot.params['id'];

  characterForm = this.fb.group({
    url: ['', [Validators.required]],
    name: ['', [Validators.required]],
    source: ['', [Validators.required]],
    birthdate: [null],
    age: [null],
    description: [''],
  });

  characterIdEffect = effect(() => {
    if (this.characterId) {
      this.store
        .select((state) =>
          state.characters.items.find(
            (c: Character) => c.id === +this.characterId,
          ),
        )
        .subscribe((character) => {
          if (character) {
            this.characterForm.patchValue({ ...character });
          }
        });
    }
  });

  saveCharacter() {
    if (this.characterForm.valid) {
      const characterData: Character = {
        id: 0,
        ...this.characterForm.value,
      } as Character;

      if (this.characterId) {
        this.store.dispatch(
          characterActions.editCharacter({
            charachter: { ...characterData, id: +this.characterId },
          }),
        );
      } else {
        this.store.dispatch(
          characterActions.addCharacter({ charachter: characterData }),
        );
      }
      this.router.navigate(['/characters']);
    }
  }
}
