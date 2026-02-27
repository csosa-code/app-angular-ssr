import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  })
  export default class PokemonsPageComponent implements OnInit {

    public isLoading = signal(true);
    private pokemonService = inject(PokemonService);
    public pokemons = signal<SimplePokemon[]>([]);
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    public currentPage = toSignal(
      this.activatedRoute.queryParamMap.pipe(
        map(params => params.get('page') ?? '1'),
        map(page => isNaN(+page) ? 1 : +page),
        map(page =>  Math.max(1, page))
      )
    )

    ngOnInit(): void {
      console.log('currentPage', this.currentPage());
      setTimeout(() => {
        this.isLoading.set(false);
      }, 500);
      this.getPokemons();
    }

    public getPokemons(page: number = 0): void {
      const loadPage = this.currentPage()! + page;
      this.pokemonService.getPokemons(loadPage)
      .pipe(tap(() =>  this.router.navigate([], { queryParams: { page: loadPage } }))
      )
      .subscribe( (pokemons) => {
        this.pokemons.set(pokemons);
      });
    }
   }
