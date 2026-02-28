import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-page',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
})
export default class PokemonPageComponent implements OnInit {
  public pokemon = signal<Pokemon | null>(null);
  private pokemonSrv = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.pokemonSrv.getPokemon(id)
    
    .pipe(tap(pokemon => {
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

      this.title.setTitle(`Pokemon ${pokemon.name}`);
      this.meta.updateTag({ name: 'og:title', content: `Pokemon ${pokemon.name}` });
      this.meta.updateTag({ name: 'description', content: `Esta es la página del pokemon ${pokemon.name}` });
      this.meta.updateTag({ name: 'og:description', content: `Esta es la página del pokemon ${pokemon.name}` });
      // this.meta.updateTag({ name: 'keywords', content: `pokemon, ${pokemon.name}, ${pokemon.types.map(type => type.type.name).join(', ')}` });
      // this.meta.updateTag({ property: 'og:image', content: imageUrl });
      // this.meta.updateTag({ property: 'og:image:alt', content: `Imagen oficial de ${pokemon.name}` });
    }))
    .subscribe((pokemon: Pokemon) => {
      this.pokemon.set(pokemon);
    });
  }

  getStatPercent(baseStat: number): number {
    return Math.min((baseStat / 255) * 100, 100);
  }

  formatStatName(name: string): string {
    return name.replace(/-/g, ' ');
  }
}
