
import { Routes } from '@angular/router';
import { ModeSelectorComponent } from './pages/mode-selector/mode-selector.component';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';

import { RecentlyViewedPageComponent } from './pages/recently-viewed-page/recently-viewed-page.component';
import { RICK_AND_MORTY_SERVICE } from './services/rick-and-morty.token';
import { RickAndMortyService } from './services/rest/rick-and-morty.service';
import { RickAndMortyGraphQLService } from './services/graphql/rick-and-morty-graphql.service';

export const routes: Routes = [
  { path: '', component: ModeSelectorComponent },
  { 
    path: 'rest', 
    component: CharactersListComponent,
    providers: [
      { provide: RICK_AND_MORTY_SERVICE, useClass: RickAndMortyService }
    ]
  },
  { 
    path: 'graphql', 
    component: CharactersListComponent,
    providers: [
      { provide: RICK_AND_MORTY_SERVICE, useClass: RickAndMortyGraphQLService }
    ]
  },
  
  { path: 'recently-viewed', component: RecentlyViewedPageComponent },
  { path: '**', redirectTo: '' }
];
