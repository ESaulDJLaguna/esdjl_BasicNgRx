import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { PokemonPaginatorResponse } from '../interfaces/pokemon-paginator.interface';
import { PokemonInfo } from '../interfaces/pokemon-info.interface';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);

  #apiUrl = 'https://pokeapi.co/api/v2';

  getPokemonPagination(
    offset: number,
    limit: number,
  ): Observable<PokemonPaginatorResponse> {
    return this.http
      .get<PokemonPaginatorResponse>(
        `${this.#apiUrl}/pokemon?offset=${offset}&limit=${limit}`,
      )
      .pipe(delay(500));
  }

  getPokemonDetail(name: string): Observable<PokemonInfo> {
    return this.http
      .get<PokemonInfo>(`${this.#apiUrl}/pokemon/${name}`)
      .pipe(delay(500));
  }
}
