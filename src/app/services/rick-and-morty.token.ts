
import { InjectionToken } from '@angular/core';
import { RickAndMortyServiceInterface } from './rick-and-morty.interface';

export const RICK_AND_MORTY_SERVICE = new InjectionToken<RickAndMortyServiceInterface>('RickAndMortyService');
