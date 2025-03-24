
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

export interface GetCharactersResponse {
  info: {
    count: number;
    pages: number;
  };
  results: Character[];
}

@Injectable({ providedIn: 'root' })
export class RickAndMortyService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number, nameFilter?: string, statusFilter?: string): Observable<GetCharactersResponse> {
    let params = new HttpParams().set('page', page);
    if (nameFilter) {
      params = params.set('name', nameFilter);
    }
    if (statusFilter) {
      params = params.set('status', statusFilter);
    }
    return this.http.get<GetCharactersResponse>(`${this.baseUrl}/character`, { params })
      .pipe(
        map(response => {
          response.results = response.results.map(char => transformCharacter(char));
          return response;
        })
      );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<any>(`${this.baseUrl}/character/${id}`)
      .pipe(map(char => transformCharacter(char)));
  }

  getLocation(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getEpisode(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getCharacterByUrl(url: string): Observable<Character> {
    return this.http.get<any>(url)
      .pipe(map(char => transformCharacter(char)));
  }
}

function transformLocationOrOrigin(obj: { name: string; url: string }): { id: string; name: string; url: string } {
  let id = '';
  if (obj.url) {
    const parts = obj.url.split('/');
    id = parts[parts.length - 1];
  }
  return { id, name: obj.name, url: obj.url };
}

function transformCharacter(char: any): Character {
  return {
    ...char,
    id: char.id.toString(),
    origin: transformLocationOrOrigin(char.origin),
    location: transformLocationOrOrigin(char.location),
    episode: char.episode.map((url: string) => {
      const parts = url.split('/');
      const episodeId = parts[parts.length - 1];
      return { id: episodeId, url: url, name: '', air_date: '', episode: '' };
    })
  };
}
