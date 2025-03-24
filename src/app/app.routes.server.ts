
import { Routes } from '@angular/router';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';

export const serverRoutes: Routes = [
  {
    path: '',
    component: CharactersListComponent,
  },
];
