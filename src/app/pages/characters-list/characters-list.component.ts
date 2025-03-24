import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { addRecentlyViewed } from '../../store/recently-viewed.actions';
import { RICK_AND_MORTY_SERVICE } from '../../services/rick-and-morty.token';
import { RickAndMortyServiceInterface, Character, GetCharactersResponse } from '../../services/rick-and-morty.interface';
import { FavoritesService } from '../../services/rest/favorites.service';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { HighlightOnHoverDirective } from '../../directives/highlight-on-hover.directive';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe'; 

@Component({
  selector: 'app-characters-list',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    CharacterDetailComponent,
    HighlightOnHoverDirective,
    MatIconModule,
    TimeAgoPipe,
  ],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter: Character | null = null;

  searchControl = new FormControl<string>('');
  statusControl = new FormControl<string>('');

  currentPage: number = 1;
  totalPages: number = 0;
  activeTab: string = 'species';
  favoriteCharacter: Character | null = null;

  displayedColumns: string[] = ['name','status','species','type','gender','created','favorite'];

  constructor(
    @Inject(RICK_AND_MORTY_SERVICE) private rickAndMortyService: RickAndMortyServiceInterface,
    private favoritesService: FavoritesService,
    private router: Router,
    private store: Store 
  ) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }
  
  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  fetchCharacters(page: number = 1): void {
    const nameFilter = this.searchControl.value || '';
    const statusFilter = this.statusControl.value || '';

    this.rickAndMortyService
      .getAllCharacters(page, nameFilter, statusFilter)
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
    this.store.dispatch(addRecentlyViewed({ character }));
  }

  onFavorite(character: Character): void {
    this.favoriteCharacter = character;
    this.favoritesService.setFavorite(character);
  }
  goToRecentlyViewed(): void {
    this.router.navigate(['/recently-viewed']);
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

  goBackToModeSelector(): void {
    this.router.navigate(['']);
  }
}


