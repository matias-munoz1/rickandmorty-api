// src/app/services/rick-and-morty.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  created: string;
  image: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode: string[];
}

export interface GetCharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
}

@Injectable({ providedIn: 'root' })
export class RickAndMortyService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number, nameFilter?: string, statusFilter?: string): Observable<any> {
    let params = new HttpParams().set('page', page);
    if (nameFilter) {
      params = params.set('name', nameFilter);
    }
    if (statusFilter) {
      params = params.set('status', statusFilter);
    }

    return this.http.get(`${this.baseUrl}/character`, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getLocation(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getEpisode(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getCharacterByUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}
