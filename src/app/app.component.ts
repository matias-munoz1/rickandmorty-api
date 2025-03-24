
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoritesService } from './services/rest/favorites.service';
import { RICK_AND_MORTY_SERVICE } from './services/rick-and-morty.token';
import { RickAndMortyService, Character } from './services/rest/rick-and-morty.service';
import { Observable } from 'rxjs';
import { RandomCharacterWidgetComponent } from './widgets/random-character-widget.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RandomCharacterWidgetComponent,    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: RICK_AND_MORTY_SERVICE, useClass: RickAndMortyService }
  ]
})
export class AppComponent implements OnInit {
  title = 'Rick and Morty API';
  favoriteCharacter$: Observable<Character | null>;
 
  constructor(
    private favoritesService: FavoritesService,
    public router: Router 
  ) {
    this.favoriteCharacter$ = this.favoritesService.favoriteCharacter$;
  }

  ngOnInit(): void {
  }


  goBackToModeSelector(): void {
    this.router.navigate(['']);
  }

  get modeClass(): string {
    if (this.router.url.startsWith('/rest')) {
      return 'rest-mode';
    } else if (this.router.url.startsWith('/graphql')) {
      return 'graphql-mode';
    }
    return '';
  }

  public get currentUrl(): string {
    return this.router.url;
  }
}
