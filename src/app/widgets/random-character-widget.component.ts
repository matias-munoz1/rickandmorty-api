import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-random-character-widget',
  standalone: true,
  imports: [CommonModule,
    
  ],
  templateUrl: './random-character-widget.component.html',
  styleUrls: ['./random-character-widget.component.scss']
})
export class RandomCharacterWidgetComponent {
    character: any = null;
    loading: boolean = false;
    error: string | null = null;
    showCard: boolean = false;
  
    constructor(private http: HttpClient) {}
  
    getRandomCharacter(): void {
      const randomId = Math.floor(Math.random() * 826) + 1;
      const url = `https://rickandmortyapi.com/api/character/${randomId}`;
  
      this.loading = true;
      this.error = null;
  
      this.http.get(url).subscribe({
        next: (data) => {
          this.character = data;
          this.showCard = true;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al obtener personaje aleatorio';
          this.loading = false;
        }
      });
    }
  
    closeCard(): void {
      this.showCard = false;
    }
  }

