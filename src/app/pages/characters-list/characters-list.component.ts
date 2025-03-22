import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RickAndMortyService, Character, GetCharactersResponse } from '../../services/rick-and-morty.service';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CharacterDetailComponent 
  ],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  nameFilter: string = '';
  statusFilter: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  activeTab: string = 'species';

  favoriteCharacter: Character | null = null;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(page: number = 1): void {
    this.rickAndMortyService.getAllCharacters(page, this.nameFilter, this.statusFilter)
      .subscribe({
        next: (response: GetCharactersResponse) => {
          this.characters = response.results;
          this.totalPages = response.info.pages;
          this.currentPage = page;
        },
        error: (err: any) => {
          console.error('Error fetching characters', err);
        }
      });
  }

  onSearch(): void {

    this.fetchCharacters(1);
  }

  onSelectCharacter(character: Character): void {
    this.selectedCharacter = character;
  }

  onFavorite(character: Character): void {
    this.favoriteCharacter = character;
    this.favoritesService.setFavorite(character);
  }

  onSelectFavorite(): void {
    if (this.favoriteCharacter) {
      this.selectedCharacter = this.favoriteCharacter;
    }
  }

  get speciesCounts() {
    const map = new Map<string, number>();
    this.characters.forEach(char => {
      const species = char.species || 'Unknown';
      map.set(species, (map.get(species) || 0) + 1);
    });
    return Array.from(map, ([key, count]) => ({ key, count }));
  }

  get typeCounts() {
    const map = new Map<string, number>();
    this.characters.forEach(char => {
      const type = char.type || 'Unknown';
      map.set(type, (map.get(type) || 0) + 1);
    });
    return Array.from(map, ([key, count]) => ({ key, count }));
  }
}
