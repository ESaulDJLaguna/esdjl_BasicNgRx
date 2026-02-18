import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { pokemonsActions } from '../../store/pokemons.actions';
import {
  currentPageSelector,
  hasPreviousPageSelector,
  hassNextPageSelector,
  isLoadingPokemonDetailSelector,
  isLoadingPokemonPaginationSelector,
  pokemonDetailCountSelector,
  pokemonPaginationResultsSelector,
  pokemonsSelector,
} from '../../store/pokemos.selectors';

@Component({
  selector: 'app-pokemons-page',
  imports: [],
  templateUrl: './pokemons-page.component.html',
})
export class PokemonsPageComponent {
  private store = inject(Store<AppState>);

  isLoadingPokemonPagination = toSignal(
    this.store.select(isLoadingPokemonPaginationSelector),
  );
  currentPage = toSignal(this.store.select(currentPageSelector));
  hasPreviousPage = toSignal(this.store.select(hasPreviousPageSelector));
  hasNextPage = toSignal(this.store.select(hassNextPageSelector));
  pokemonPaginationResults = toSignal(
    this.store.select(pokemonPaginationResultsSelector),
  );
  isLoadingPokemonDetail = toSignal(
    this.store.select(isLoadingPokemonDetailSelector),
  );
  pokemons = toSignal(this.store.select(pokemonsSelector));
  pokemonsCount = toSignal(this.store.select(pokemonDetailCountSelector));

  ngOnInit() {
    this.store.dispatch(pokemonsActions.loadingPokemonsPagination());
  }

  nextPage() {
    this.store.dispatch(pokemonsActions.loadNextPokemonsPage());
  }

  previousPage() {
    this.store.dispatch(pokemonsActions.loadPreviousPokemonsPage());
  }

  loadingPokemonDetail(pokemonName: string) {
    this.store.dispatch(pokemonsActions.loadingPokemonDetail({ pokemonName }));
  }

  removePokemon(index: number) {
    this.store.dispatch(pokemonsActions.removingPokemon());
    setTimeout(() => {
      this.store.dispatch(pokemonsActions.removePokemon({ index }));
    }, 500);
  }

  clearPokemons() {
    this.store.dispatch(pokemonsActions.removingPokemon());
    setTimeout(() => {
      this.store.dispatch(pokemonsActions.clearPokemons());
    }, 500);
  }
}
