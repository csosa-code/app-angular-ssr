import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
})
export default class AboutPageComponent implements OnInit { 

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Acerca de PokeApp');
    this.meta.updateTag({ name: 'description', content: 'Esta es la página de acerca de PokeApp' });
    this.meta.updateTag({ name: 'og:title', content: 'Acerca de PokeApp' });
    this.meta.updateTag({ name: 'keywords', content: 'acerca, de, pokeapp, page, angular' });
  }
}