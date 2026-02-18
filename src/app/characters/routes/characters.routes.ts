import { Routes } from '@angular/router';
import { CHARACTERS_ROUTES } from './characters.constant';
import { CharacterFormPageComponent } from '../pages/character-form-page/character-form-page.component';
import { CharacterPageComponent } from '../pages/character-page/character-page.component';

export const charactersRoutes: Routes = [
  {
    path: '',
    component: CharacterPageComponent,
  },
  {
    path: CHARACTERS_ROUTES.AddCharacter.name,
    component: CharacterFormPageComponent,
  },
  {
    path: `${CHARACTERS_ROUTES.EditCharacter.name}/:id`,
    component: CharacterFormPageComponent,
  },
];

export default charactersRoutes;
