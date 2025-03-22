import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickAndMortyService, Character } from '../../services/rick-and-morty.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnChanges {
  @Input() character!: Character;

  originInfo: any;
  locationInfo: any;
  oneEpisode: any;

  originResidentName: string | null = null;
  locationResidentName: string | null = null;

  noOrigin = false;
  noLocation = false;
  noEpisode = false;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character) {
      this.loadDetails();
    }
  }

  loadDetails(): void {
    if (this.character.origin?.url) {
      this.rickAndMortyService.getLocation(this.character.origin.url)
        .subscribe({
          next: (data) => {
            this.originInfo = data;
            if (data.residents && data.residents.length > 0) {
              const firstResidentUrl = data.residents[0];
              this.fetchResidentName(firstResidentUrl).subscribe(name => {
                this.originResidentName = name;
              });
            } else {
              this.originResidentName = null; 
            }
          },
          error: () => {
            this.noOrigin = true;
          }
        });
    } else {
      this.noOrigin = true; 
    }

    if (this.character.location?.url) {
      this.rickAndMortyService.getLocation(this.character.location.url)
        .subscribe({
          next: (data) => {
            this.locationInfo = data;
            if (data.residents && data.residents.length > 0) {
              const firstResidentUrl = data.residents[0];
              this.fetchResidentName(firstResidentUrl).subscribe(name => {
                this.locationResidentName = name;
              });
            } else {
              this.locationResidentName = null;
            }
          },
          error: () => {
            this.noLocation = true;
          }
        });
    } else {
      this.noLocation = true; 
    }

    if (this.character.episode && this.character.episode.length > 0) {
      const randomEpisodeUrl = this.character.episode[0];
      this.rickAndMortyService.getEpisode(randomEpisodeUrl)
        .subscribe({
          next: (data) => {
            this.oneEpisode = data;
          },
          error: () => {
            this.noEpisode = true;
          }
        });
    } else {
      this.noEpisode = true; 
    }
  }

  fetchResidentName(url: string) {
    return this.rickAndMortyService.getLocation(url)
      .pipe(
        switchMap((residentData: any) => {

          return of(residentData.name || 'Desconocido');
        })
      );
  }
}
