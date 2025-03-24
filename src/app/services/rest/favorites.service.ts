
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from './rick-and-morty.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteCharacterSubject = new BehaviorSubject<Character | null>(null);
  favoriteCharacter$ = this.favoriteCharacterSubject.asObservable();

  setFavorite(character: Character): void {
    this.favoriteCharacterSubject.next(character);
  }
}
