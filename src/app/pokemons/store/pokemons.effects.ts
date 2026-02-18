import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonService } from '../services/pokemon.service';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import { pokemonsActions } from './pokemons.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { currentPageSelector } from './pokemos.selectors';

@Injectable()
export class PokemonsEffects {
  private actions$ = inject(Actions);
  private pokemonService = inject(PokemonService);
  private store = inject(Store<AppState>);

  loadPokemonsPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pokemonsActions.loadingPokemonsPagination,
        pokemonsActions.loadNextPokemonsPage,
        pokemonsActions.loadPreviousPokemonsPage,
      ),
      withLatestFrom(this.store.select(currentPageSelector)),
      mergeMap(([action, currentPage]) => {
        const limit = 9;
        const offset = (currentPage - 1) * limit;

        return this.pokemonService
          .getPokemonPagination(offset, limit)
          .pipe(
            map((pagination) =>
              pokemonsActions.loadPokemonsPaginationSuccess({ pagination }),
            ),
          );
      }),
    ),
  );

  loadPokemonsDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pokemonsActions.loadingPokemonDetail),
      mergeMap(({ pokemonName }) =>
        this.pokemonService
          .getPokemonDetail(pokemonName)
          .pipe(
            map((pokemonInfo) =>
              pokemonsActions.loadPokemonDetailsSuccess({ pokemonInfo }),
            ),
          ),
      ),
    ),
  );
}
