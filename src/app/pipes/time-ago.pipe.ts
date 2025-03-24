import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return ''; 
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    if (diffMs < 0) {
      return 'En el futuro';
    }

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours   = Math.floor(diffMinutes / 60);
    const diffDays    = Math.floor(diffHours / 24);
    const diffMonths  = Math.floor(diffDays / 30); 
    const diffYears   = Math.floor(diffDays / 365); 

    if (diffSeconds < 60) {
      return 'Justo ahora';
    } else if (diffMinutes < 60) {
      return `Hace ${diffMinutes} min`;
    } else if (diffHours < 24) {
      return `Hace ${diffHours} horas`;
    } else if (diffDays < 30) {
      return `Hace ${diffDays} días`;
    } else if (diffMonths < 12) {
      return `Hace ${diffMonths} meses`;
    } else {
      return `Hace ${diffYears} años`;
    }
  }
}
