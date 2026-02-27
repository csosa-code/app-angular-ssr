import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonResponse, Result } from '../interfaces/pokemon-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

private http = inject(HttpClient);

public getPokemons(page: number = 0): Observable<SimplePokemon[]> {
   if (page !== 0) {
    --page;
   }

   return this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map( resp => {
        const simplePokemons: SimplePokemon[] = resp.results.map( (result: Result) => {
          const urlParts = result.url.split('/');
          const id = urlParts[urlParts.length - 2];
          return {
            id,
            name: result.name,
            url: result.url,
          }
        });
        return simplePokemons;
      })
    )
   ;
}

public getPokemon(id: string): Observable<Pokemon> {
  return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

}
