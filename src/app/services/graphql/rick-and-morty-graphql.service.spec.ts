import { TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RickAndMortyGraphQLService } from './rick-and-morty-graphql.service';

describe('RickAndMortyGraphQLService', () => {
  let service: RickAndMortyGraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule
      ],
      providers: [
        RickAndMortyGraphQLService
      ]
    });
    service = TestBed.inject(RickAndMortyGraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
