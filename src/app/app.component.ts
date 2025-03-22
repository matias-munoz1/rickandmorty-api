import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FavoritesService } from './services/favorites.service';
import { Character } from './services/rick-and-morty.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Rick and Morty API';

  favoriteCharacter: Character | null = null;

  showFavoriteDetails: boolean = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
   
    this.favoritesService.favoriteCharacter$.subscribe(character => {
      this.favoriteCharacter = character;
  
      this.showFavoriteDetails = false;
    });
  }

  onToggleFavoriteDetails(): void {
    this.showFavoriteDetails = !this.showFavoriteDetails;
  }
}
