
import { Observable } from 'rxjs';

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  created: string;
  image: string;
  origin: { id: string; name: string; url: string };
  location: { id: string; name: string; url: string };
  episode: Episode[];
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  url?: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Array<{ id: string; name: string }>;
}

export interface GetCharactersResponse {
  info: {
    count: number;
    pages: number;
  };
  results: Character[];
}

export interface RickAndMortyServiceInterface {
  getAllCharacters(page: number, nameFilter?: string, statusFilter?: string): Observable<GetCharactersResponse>;
  getCharacterById(id: number): Observable<Character>;
  getLocation(url: string): Observable<any>;
  getEpisode(url: string): Observable<any>;
  getCharacterByUrl(url: string): Observable<Character>;
}
