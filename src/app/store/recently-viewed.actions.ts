import { createAction, props } from '@ngrx/store';
import { Character } from '../services/rick-and-morty.interface';

export const addRecentlyViewed = createAction(
  '[Recently Viewed] Add Character',
  props<{ character: Character }>()
);

export const clearRecentlyViewed = createAction(
  '[Recently Viewed] Clear Characters'
);
