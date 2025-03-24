import { createReducer, on } from '@ngrx/store';
import { addRecentlyViewed, clearRecentlyViewed } from './recently-viewed.actions';
import { Character } from '../services/rick-and-morty.interface';

export interface RecentlyViewedState {
  characters: Character[];
}

export const initialState: RecentlyViewedState = {
  characters: []
};

export const recentlyViewedReducer = createReducer(
  initialState,
  on(addRecentlyViewed, (state, { character }) => {
    const filtered = state.characters.filter(c => c.id !== character.id);
    return { characters: [character, ...filtered].slice(0, 5) };
  }),
  on(clearRecentlyViewed, () => ({ characters: [] }))
);
