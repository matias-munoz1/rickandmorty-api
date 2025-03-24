
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from '../../services/rick-and-morty.interface';
import { clearRecentlyViewed } from '../../store/recently-viewed.actions';

interface AppState {
  recentlyViewed: { characters: Character[] };
}

@Component({
  selector: 'app-recently-viewed-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recently-viewed-page">
      <h2>Historial de Vistos Recientemente</h2>
      <button (click)="onClear()">Limpiar Historial</button>
      <div *ngIf="recentlyViewed$ | async as characters; else noCharacters">
        <ul>
          <li *ngFor="let character of characters">
            <img [src]="character.image" [alt]="character.name" />
            <span>{{ character.name }}</span>
          </li>
        </ul>
      </div>
      <ng-template #noCharacters>
        <p>No has visto ningún personaje aún.</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['./recently-viewed-page.component.scss']
})
export class RecentlyViewedPageComponent {
  recentlyViewed$: Observable<Character[]>;

  constructor(private store: Store<AppState>) {
    this.recentlyViewed$ = this.store.select(state => state.recentlyViewed.characters);
  }

  onClear(): void {
    this.store.dispatch(clearRecentlyViewed());
  }
}
