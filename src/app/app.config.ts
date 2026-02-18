import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ROOT_STORE } from './app.state';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { PokemonsEffects } from './pokemons/store/pokemons.effects';
import { localStorageSyncMetaReducer } from './store/storage.meta-reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(ROOT_STORE, {
      metaReducers: [localStorageSyncMetaReducer],
    }),
    provideEffects([PokemonsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withFetch()),
  ],
};
