import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  RickAndMortyServiceInterface, 
  GetCharactersResponse, 
  Character, 
  Episode, 
  Location 
} from '../rick-and-morty.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyGraphQLService implements RickAndMortyServiceInterface {

  constructor(private apollo: Apollo) {}

  getAllCharacters(page: number = 1, name: string = '', status: string = ''): Observable<GetCharactersResponse> {
    const GET_CHARACTERS = gql`
      query getCharacters($page: Int, $name: String, $status: String) {
        characters(page: $page, filter: { name: $name, status: $status }) {
          info {
            pages
            count
          }
          results {
            id
            name
            status
            species
            type
            gender
            created
            image
            origin {
              id
              name
            }
            location {
              id
              name
            }
            episode {
              id
              name
              air_date
              episode
            }
          }
        }
      }
    `;
    return this.apollo.query<{ characters: GetCharactersResponse }>({
      query: GET_CHARACTERS,
      variables: { page, name, status }
    }).pipe(map(result => result.data.characters));
  }

  getCharacterById(id: number): Observable<Character> {
    const GET_CHARACTER = gql`
      query getCharacter($id: ID!) {
        character(id: $id) {
          id
          name
          status
          species
          type
          gender
          created
          image
          origin {
            id
            name
          }
          location {
            id
            name
          }
          episode {
            id
            name
            air_date
            episode
          }
        }
      }
    `;
    return this.apollo.query<{ character: Character }>({
      query: GET_CHARACTER,
      variables: { id }
    }).pipe(map(result => result.data.character));
  }

  getCharacterByUrl(url: string): Observable<Character> {
    const id = extractIdFromUrl(url);
    return this.getCharacterById(id);
  }

  getLocation(url: string): Observable<Location> {
    const id = extractIdFromUrl(url);
    const GET_LOCATION = gql`
      query getLocation($id: ID!) {
        location(id: $id) {
          id
          name
          type
          dimension
          residents {
            id
            name
          }
        }
      }
    `;
    return this.apollo.query<{ location: Location }>({
      query: GET_LOCATION,
      variables: { id }
    }).pipe(map(result => result.data.location));
  }

  getEpisode(url: string): Observable<Episode> {
    const id = extractIdFromUrl(url);
    const GET_EPISODE = gql`
      query getEpisode($id: ID!) {
        episode(id: $id) {
          id
          name
          air_date
          episode
        }
      }
    `;
    return this.apollo.query<{ episode: Episode }>({
      query: GET_EPISODE,
      variables: { id }
    }).pipe(map(result => result.data.episode));
  }
}

function extractIdFromUrl(url: string): number {
  const parts = url.split('/');
  return Number(parts[parts.length - 1]);
}
