import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mode-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mode-selector">
      <h1>Selecciona el modo de API</h1>
      <div class="buttons">
        <button (click)="selectMode('rest')">REST</button>
        <button (click)="selectMode('graphql')">GraphQL</button>
      </div>
    </div>
  `,
  styleUrls: ['./mode-selector.component.scss']
})
export class ModeSelectorComponent {
  constructor(private router: Router) {}

  selectMode(mode: string): void {
    this.router.navigate([`/${mode}`]);
  }
}
