import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from '../../services/rick-and-morty.interface';
import { clearRecentlyViewed } from '../../store/recently-viewed.actions';
import { Router, ActivatedRoute } from '@angular/router';

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
      <div class="buttons">
        <button (click)="goBackToApi()">Volver</button>
        <button (click)="onClear()">Limpiar Historial</button>
      </div>
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
export class RecentlyViewedPageComponent implements OnInit {
  recentlyViewed$: Observable<Character[]>;
  mode: string = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.recentlyViewed$ = this.store.select(state => state.recentlyViewed.characters);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mode = params['mode'] || '';
    });
  }

  onClear(): void {
    this.store.dispatch(clearRecentlyViewed());
  }

  goBackToApi(): void {
    if (this.mode === 'rest') {
      this.router.navigate(['/rest']);
    } else if (this.mode === 'graphql') {
      this.router.navigate(['/graphql']);
    } else {
      this.router.navigate(['']);
    }
  }
}
